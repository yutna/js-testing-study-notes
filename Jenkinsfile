pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm ci'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }
    }

    post {
        always {
            junit 'test-results/*.xml'
        }

        failure {
            echo 'Build failed.'
        }
    }
}
