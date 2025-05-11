# --- Angular Build Stage ---
FROM node:18 AS frontend-build

WORKDIR /frontend

COPY ./frontend-ui/package*.json ./
RUN npm install

COPY ./frontend-ui ./
RUN npm run build -- --configuration production

# --- Spring Build Stage ---
FROM maven AS build

WORKDIR /task-app

COPY pom.xml .

COPY src ./src
# Copy built Angular files into Spring static resources
COPY --from=frontend-build /frontend/dist/frontend-ui/browser/* ./src/main/resources/static/

RUN mvn clean package -DskipTests

# ---- Run Stage ----
FROM openjdk

WORKDIR /task-app

COPY --from=build /task-app/target/server-0.0.1-SNAPSHOT.jar task-app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "task-app.jar"]
