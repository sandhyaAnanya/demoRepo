pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }
  stages {
    stage('Auth-Build') {
      steps {
        sh 'docker build . -t sandhya123exza/auth-service --no-cache --progress=plain'
      }
    }
    stage('Build-Notifications') {
      steps {
        sh 'docker build ../../ -f Dockerfile -t sandhya123exza/notifications-service --no-cache --progress=plain'
        
      }
    }
    stage('Build-Payment') {
      steps {
        sh 'docker build ../../ -f Dockerfile -t sandhya123exza/payment-service --no-cache --progress=plain'
        
      }
    }
    stage('Build-Reservations') {
      steps {
        sh 'docker build ../../ -f Dockerfile -t sandhya123exza/reservations-service --no-cache --progress=plain'
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