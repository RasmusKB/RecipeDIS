plugins {
    java
    id("org.springframework.boot") version "3.2.5"
    id("io.spring.dependency-management") version "1.1.4"
}

group = "com.dis"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

	implementation("org.hibernate.validator:hibernate-validator:8.0.0.Final")
	annotationProcessor("org.hibernate.javax.persistence:hibernate-jpa-2.1-api:1.0.2.Final")

    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

	implementation("org.postgresql:postgresql:42.5.4")

	implementation("com.querydsl:querydsl-core:5.0.0")
	implementation("com.querydsl:querydsl-jpa:5.0.0")
	annotationProcessor("com.querydsl:querydsl-apt:5.0.0:jpa")
	annotationProcessor("javax.annotation:javax.annotation-api:1.3.2")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")

}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.withType<org.springframework.boot.gradle.tasks.bundling.BootJar> {
    mainClass.set("com.dis.recipe.Main")
}

tasks.named("build") {
    dependsOn(tasks.named("bootJar"))
}
