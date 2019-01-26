export class FileManager {
  fileReader: FileReader;

  constructor() {
    this.fileReader = new FileReader();
  }

  async readFile(file: File) {
    try {
      this.fileReader.onload = () => {
        //TODO: Add File loaded logic
        let result = this.fileReader.result;
        console.log('here is result');
        //console.log(result);
        console.log(JSON.parse(result as string));
        return JSON.parse(result as string);
      };

      this.fileReader.onprogress = (progress) => {
        //TODO: Add and dispatch Progress here
        console.log(progress);
      };

      this.fileReader.onerror = (error) => {
        //TODO: Throw Error here
        throw error;
      };

      this.fileReader.readAsText(file);
    } catch(e) {
      console.info(e); //TODO: write logger for project
      throw e
    }

  }
}
