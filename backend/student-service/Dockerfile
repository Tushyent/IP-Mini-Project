# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy the maven wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
# Ensure the wrapper has execution permissions
RUN chmod +x mvnw

# Download dependencies (this will be cached unless pom.xml changes)
RUN ./mvnw dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port (will be overridden by SERVER_PORT env var)
EXPOSE 8082

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
