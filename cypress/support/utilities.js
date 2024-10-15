const ExcelJS = require('exceljs');
const fs = require('fs');


const deleteFileOrFolder = (fPath) => {
    // Function to delete a file or folder
    if (fs.existsSync(fPath)) {
        fs.rmSync(fPath, { recursive: true, force: true });
        return { message: `${fPath} deleted successfully.` };
    } else {
        return { message: `${fPath} does not exist.` };
    }
};

module.exports = {
     deleteFileOrFolder 
};
