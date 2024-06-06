# Utiliza una imagen base de OpenJDK 8 con Alpine
FROM openjdk:8-jdk-alpine

# Crea un grupo y un usuario sin privilegios
RUN addgroup -S spring && adduser -S spring -G spring

# Establece el usuario creado para ejecutar la aplicación
USER spring:spring

# Argumento para el archivo JAR
ARG JAR_FILE=target/*.jar

# Copia el archivo JAR en el contenedor
COPY ${JAR_FILE} app.jar

# Exponer el puerto en el que la aplicación Spring Boot se ejecutará
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java","-jar","/app.jar"]


