# SemencesCertifiées

Student Project in ICT4D Course at VU Amsterdam. The project is about a web and voice xml application that helps farmers to access their certifications. 

The projects is structured in two components: 
- A web application
- A REST API
- A VoiceXML application

## Web Application

The Web Application is written in basic HTML with CSS and JavaScript. It is a multi page application that uses the REST API to retrieve and update data.

The Web Application is hosted on: https://semencescertifiees.elch.cc/

Folder: [`frontend`](frontend)

## REST API

The REST API is written in Node.JS and uses the Express framework. The API is used to retrieve and update data from a MySQL database. 

The API is hosted on: https://api.semencescertifiees.elch.cc/

A in depth documentation of the API can be found in the [`api`](api) folder and on: https://github.com/elianderlohr/SemencesCertifiees/wiki

Folder: [`api`](api)

## VoiceXML

The VoiceXML application is written in VoiceXML and uses the REST API to retrieve and update data. 

Folder: [`voicexml`](voicexml)