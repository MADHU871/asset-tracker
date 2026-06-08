pipeline {
agent any

```
environment {
    DOCKER_IMAGE = "nikhilabba12/asset-tracker:latest"
    AZURE_WEBAPP_NAME = "asset-tracker-app"
}

stages {

    stage('Checkout') {
        steps {
            git branch: 'main',
                url: 'https://github.com/MADHU871/asset-tracker.git'
        }
    }

    stage('Build Node App') {
        steps {
            sh 'npm install'
        }
    }

    stage('Run Tests') {
        steps {
            sh 'npm test'
        }
    }

    stage('Build Docker Image') {
        steps {
            sh "docker build -t ${DOCKER_IMAGE} ."
        }
    }

    stage('Docker Login') {
        steps {
            withCredentials([
                usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )
            ]) {
                sh '''
                echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                '''
            }
        }
    }

    stage('Push Docker Image') {
        steps {
            sh "docker push ${DOCKER_IMAGE}"
        }
    }

    stage('Deploy Azure Web App') {
        steps {
            withCredentials([
                string(
                    credentialsId: 'azure-publish-profile',
                    variable: 'AZURE_PROFILE'
                )
            ]) {
                sh '''
                echo "Azure deployment stage configured"
                '''
            }
        }
    }
}

post {
    success {
        echo 'Pipeline completed successfully'
    }

    failure {
        echo 'Pipeline failed'
    }
}
```

}
