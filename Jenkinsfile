pipeline {
  agent {
    docker {
      image 'node:latest'
    }
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }
  stages {
    stage('Build') {
      steps {
        sh 'docker build ../../ -f ./apps/auth/Dockerfile -t sandhya123exza/auth-service'
        sh 'docker build ../../ -f ./apps/notifications/Dockerfile -t sandhya123exza/notifications-service'
        sh 'docker build ../../ -f ./apps/payment/Dockerfile -t sandhya123exza/payment-service'
        sh 'docker build ../../ -f ./apps/reservations/Dockerfile -t sandhya123exza/reservations-service'
      }
    }
    stage('Login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push') {
      steps {
        sh 'docker push sandhya123exza/auth-service'
        sh 'docker push sandhya123exza/notifications-service'
        sh 'docker push sandhya123exza/payment-service'
        sh 'docker push sandhya123exza/reservations-service'
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}