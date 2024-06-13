const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');

export const sanitizeString = (text: string) => {
  const trimText = text.trim();
  const withoutColons = trimText.toLocaleLowerCase().replace(/:/g, '');
  const sanitizedStr = withoutColons.replace(/\s|:/g, '-');
  return sanitizedStr;
};

export const readFileJSONAndParse = async (recordName: string) => {
  try {
    const filePath = path.join(__dirname, `../mocks/${recordName}.json`);
    const validPath = fs.existsSync(filePath);
    if (!validPath) {
      throw new Error(`File ${recordName} not found`);
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const formatData = JSON.parse(data).map((item: any) => {
      return {
        ...item,
        _id: new ObjectId(),
      };
    });
    return formatData;
  } catch (err) {
    console.log(`Error reading file ${recordName}: ${err}`);
  }
};
