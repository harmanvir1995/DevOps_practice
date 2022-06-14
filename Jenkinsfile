pipeline {
  agent any
  stages {
    stage("Build") {
      sh '''
          ./jenkins/build/npm.sh
         '''
    }
    stage("Test") {
      sh 'npm test'      
    }
    stage("Push") {
      'echo PUSH'
    }
    stage("Deploy") {
      'echo Deploy'
    }
  }
}
