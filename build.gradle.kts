plugins {
    id("io.spring.dependency-management") version "1.1.4" apply false
    id("org.springframework.boot") version "3.2.5" apply false
    java
}

group = "com.dis"
version = "0.0.1-SNAPSHOT"

subprojects {
    apply(plugin = "java")
    apply(plugin = "io.spring.dependency-management")

    repositories {
        mavenCentral()
    }

    tasks.withType<Test> {
        useJUnitPlatform()
    }
}

tasks.register<Exec>("npmInstallRecipeApp") {
    workingDir = file("recipe-app")
    commandLine = listOf("npm", "install")
}

subprojects {
    tasks.withType<JavaCompile> {
        dependsOn(rootProject.tasks.named("npmInstallRecipeApp"))
    }
}
