const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: '../app/assets/images/logos/',
    filename: function(req, file, cb){
        cb(null, Date.now() + '.'+ file.mimetype.split('/')[1])
    }
}
)
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer({storage: storage});
const cors = require('cors');
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
const readFileData = (dataFilePath) => {
    try {
        const rawData = fs.readFileSync(dataFilePath);
        console.log(JSON.parse(rawData));
        return JSON.parse(rawData);
    } catch (error) {
        return [];
    }
};
const writeFileData = (dataFilePath,data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};
app.post('/api/register',   upload.none(),(req, res) => {
    const dataFilePath = path.join(__dirname, 'db', 'Students.js');     
    const newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    try {
        const data = readFileData(dataFilePath);
        data.push(newUser);
        writeFileData(dataFilePath, data);
        res.status(201).send('User added.');
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send('Error adding user.');
    }
});
app.post('/api/login',   upload.none(),(req, res) => {
    const dataFilePath = path.join(__dirname, 'db', 'Students.js');     
    const { email, password } = req.body;
    try {
        const data = readFileData(dataFilePath);
        const user = data.find(user => user.email === email);
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ email: user.email }, 'crush', { expiresIn: '10h' });
            res.status(200).json({ token, email });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send('Error during login');
    }
});

app.post('/api/subjects', upload.single('Logo'), (req, res) => {
    const dataFilePath = path.join(__dirname, 'db', 'Subjects.js');
    const newSubject = req.body;
    const logoFile = req.file;
    if (logoFile) {
        newSubject.Logo = logoFile.filename; // Only update the logo if a new file was provided
    } 
    try {
      const data = readFileData(dataFilePath);
                data.push(newSubject); 
                writeFileData(dataFilePath,data);
                res.status(201).send('Subject added.');
            } catch (error) {
                console.error("Error adding subject:", error);
                res.status(500).send('Error adding subject.');
            }
})
app.put('/api/subjects/:id', upload.single('Logo'),(req, res) => {
    const { id } = req.params;
    const dataFilePath = path.join(__dirname, 'db', 'Subjects.js');
    const updatedSubject = req.body;
    const logoFile = req.file;
    if (logoFile) {
        updatedSubject.Logo = logoFile.filename; // Only update the logo if a new file was provided
    } 
    try {   
      const data = readFileData(dataFilePath);
      dataToEdit = data.map(subject => subject.Id === id ? updatedSubject : subject);
      writeFileData(dataFilePath,dataToEdit);
                res.status(201).send('Subject added.');
            } catch (error) {
                console.error("Error adding subject:", error);
                res.status(500).send('Error adding subject.');
            }
});
app.delete('/api/subjects/:id', (req, res) => {
    const { id } = req.params;
    const dataFilePath = path.join(__dirname, 'db', 'Subjects.js');
    let data = readFileData(dataFilePath);
    data = data.filter(subject => subject.Id !== id);
    writeFileData(dataFilePath, data);
    res.send('Subject deleted.');
});
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) return res.status(403).send('Forbidden');
        req.user = user;
        next();
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
