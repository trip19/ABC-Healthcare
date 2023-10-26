pipeline {
    agent any
    environment {
        BUILD_CONFIGURATION = 'Release'
        ASPNET_BRANCH = 'master' // Change to the branch for the ASP.NET web app
        CLIENTAPP_BRANCH = 'Frontend' // Change to the branch for the client app
        TESTS_BRANCH = 'test' // Change to the branch for the tests
    }
    
    stages {
        stage('Checkout ASP.NET Web App') {
            steps {
                script {
                    // Checkout the ASP.NET web app branch
                    checkout([$class: 'GitSCM', branches: [[name: "*/${ASPNET_BRANCH}"]], doGenerateSubmoduleConfigurations: false, extensions: [], userRemoteConfigs: [[url: 'https://github.com/your/repo.git']]])
                }
            }
        }

        stage('Build .NET Project') {
            steps {
                script {
                    // Navigate to the .NET project directory
                    dir('C:\\Users\\tripti.nayak\\Downloads\\MedEcommerce_API-master\\MedEcommerce_API-master\\MedEcommerce_API') {
                        // Build the .NET project using 'dotnet build'
                        bat "dotnet build --configuration ${env.BUILD_CONFIGURATION}"
                    }
                }
            }
        }

        stage('Checkout Client App') {
            steps {
                script {
                    // Checkout the client app branch
                    checkout([$class: 'GitSCM', branches: [[name: "*/${CLIENTAPP_BRANCH}"]], doGenerateSubmoduleConfigurations: false, extensions: [], userRemoteConfigs: [[url: 'https://github.com/your/repo.git']]])
                }
            }
        }

        stage('Build Client App') {
            steps {
                script {
                    // Navigate to the client app directory
                    dir('C:\\Users\\tripti.nayak\\Downloads\\ABC_Healthcare_Frontend') {
                        // Install dependencies using 'npm'
                        bat 'npm install'
                        
                        // Build the client app using 'npm'
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Checkout Tests') {
            steps {
                script {
                    // Checkout the tests branch
                    checkout([$class: 'GitSCM', branches: [[name: "*/${TESTS_BRANCH}"]], doGenerateSubmoduleConfigurations: false, extensions: [], userRemoteConfigs: [[url: 'https://github.com/your/repo.git']]])
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run your xUnit tests
                    bat 'dotnet test' // Adjust this based on your project structure and test commands
                }
            }
        }
    }
}
