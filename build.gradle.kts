group = "com.dis"
version = "0.0.1-SNAPSHOT"

subprojects {
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
    standardOutput = System.out
    errorOutput = File("/dev/null").outputStream()
}

subprojects {
    tasks.withType<JavaCompile> {
        dependsOn(rootProject.tasks.named("npmInstallRecipeApp"))
    }
}
