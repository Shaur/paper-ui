pipeline {
  agent {
      label "kubeagent"
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
    disableConcurrentBuilds()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build version') {
      steps {
        script {
            sh """
              docker build -f Dockerfile.default -t ${DOCKER_REGISTRY}/paper-ui:latest .
              docker push ${DOCKER_REGISTRY}/paper-ui:latest
            """
        }
      }
    }

    stage('Deploy version') {
      steps {
        script {
          sh 'helm upgrade --install paper-ui paper-chart'
        }
      }
    }
  }
}
