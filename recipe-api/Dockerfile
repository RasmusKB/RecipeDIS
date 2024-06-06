FROM amazoncorretto:21.0.3

WORKDIR /app

COPY build/libs/recipe-api-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
