package com.website.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.website.demo")
public class GetLoudTixApplication {

	public static void main(String[] args) {
		SpringApplication.run(GetLoudTixApplication.class, args);
	}

}
