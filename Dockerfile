# syntax=docker/dockerfile:1
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./
COPY src src

RUN chmod +x gradlew \
	&& ./gradlew bootJar --no-daemon \
	&& cp build/libs/portfolio-*.jar application.jar

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

RUN groupadd --system spring && useradd --system --gid spring spring
USER spring:spring

COPY --from=build /app/application.jar app.jar

EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
