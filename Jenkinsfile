pipeline {
    agent any 

     options {
        timeout(time: 10, unit: 'MINUTES')
     }
    environment {
    DOCKERHUB_CREDENTIALS = credentials('lily-docker-credentials')
    APP_NAME = "laly9999/sample-app"
    }
    stages { 
        stage('SCM Checkout') {
            steps{
           git branch: 'main', url: 'https://github.com/lily4499/blue-green-eks.git'
            }
        }
        // run sonarqube test
        stage('Run SonarQube') {
            environment {
                scannerHome = tool name: 'sonar-scanner'  // Replace with the correct scanner name
            }
            steps {
                withSonarQubeEnv('sonar-server') {  // Replace 'sonar-server' with your configured SonarQube server name
                    sh "${scannerHome}/bin/sonar-scanner -Dproject.settings=sonar-project.properties"
                }
            }
        }

        stage('Build docker image') {
            steps {  
                sh 'docker build -t $APP_NAME:$BUILD_NUMBER .'
            }
        }
        stage('login to dockerhub') {
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Trivy Scan (Aqua)') {
            steps {
                sh 'trivy image $APP_NAME:$BUILD_NUMBER'
            }
       }
        stage('push image') {
            steps{
                sh 'docker push $APP_NAME:$BUILD_NUMBER'
            }
        }
        stage('Trigger ManifestUpdate') {
             steps{
                build job: 'sample-app-manifest', parameters: [string(name: 'IMAGETAG', value: env.BUILD_NUMBER)]     

            } 
           } 
        }
   
}
