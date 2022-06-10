# AWS Celebrity Identifier

App to identify celebrities from an image.

Explanation and setup video: [https://drive.google.com/file/d/1T_2t5iOQcHapqkDuDQ4bD2V6Nlmt8DTV/view?usp=sharing](https://drive.google.com/file/d/1T_2t5iOQcHapqkDuDQ4bD2V6Nlmt8DTV/view?usp=sharing)

Live demo: [https://celebrityidentifier.campleman.co.za](https://celebrityidentifier.campleman.co.za)

GitHub Repo: [https://github.com/DaelinCampleman/AWSCelebrityIdentifier](https://github.com/DaelinCampleman/AWSCelebrityIdentifier)

## Prerequisates

- Node.js
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

- Angular CLI
```bash
$ npm install -g @angular/cli
```

- AWS IAM user with permission to access AWS Rekognition

## Installation

Download the code from this repository to a directory.

Download required modules:
```bash
$ npm install
```

Update `aws-exports.ts` file with your AWS region and IAM user keys.
```javascript
 const AWSConfig = {
  region: "", // e.g. us-east-1
  credentials: {
    "accessKeyId": "",
    "secretAccessKey": "",
    "region": "" // e.g. us-east-1
  }
};

export default AWSConfig;
```

## Usage

Start Angular Server
```bash
$ ng serve
```

Visit `http://localhost:4200/` in your browser.
From here, you can drag and drop any image onto the page to identify the celebrity.
