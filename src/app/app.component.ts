import { Component } from '@angular/core';

import { RecognizeCelebritiesCommand } from  "@aws-sdk/client-rekognition";
import * as AWS from "@aws-sdk/client-rekognition";
import AWSConfig from 'src/aws-exports';
import { HttpClient } from '@angular/common/http';

const rekogClient = new AWS.RekognitionClient(AWSConfig);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Celebrity Identifier"
  files: File[] = [];
  celebName = "";

  constructor(private http: HttpClient){

  }

  public recognize_celebrity = async(params: any) => {
    try {
        console.log("Recognizing celebrities...");
        const response = await rekogClient.send(new RecognizeCelebritiesCommand(params));
        let name: string | undefined = "";
        if(response.CelebrityFaces != null){
          for(let i = 0; i < response.CelebrityFaces.length; i++){
              name = response.CelebrityFaces[i].Name;
              break;
          }
        }

        this.celebName = name!;
        return name!;
      } catch (err) {
        console.log("Error", err);
        this.celebName = "There was a problem recognizing the celebrity! Please try again.";
        return "There was a problem recognizing the celebrity! Please try again.";
    }
  }

  public fileChange(event: any){
    console.log("Running Function");
    this.celebName = "Identifying...";
    this.files = [];
    this.files.push(...event.addedFiles);
    if(event != null){
      const reader = new FileReader();
      const fileByteArray: number[] = [];

      reader.readAsArrayBuffer(event.addedFiles[0]);
      reader.onloadend = (evt: any) => {
        if (evt.target.readyState === FileReader.DONE) {
          const arrayBuffer = evt.target.result,
            array = new Uint8Array(arrayBuffer);
          for (const a of array) {
            fileByteArray.push(a);
          }
          console.log("IMage Byte Array: ");
          console.log(fileByteArray);
          let result = this.recognize_celebrity({
            Image: {
              Bytes: fileByteArray
            }
          });
        }
      }
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
