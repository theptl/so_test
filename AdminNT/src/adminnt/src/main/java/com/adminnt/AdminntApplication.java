package com.adminnt;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan("com.adminnt")
@ComponentScan("com.adminnt")
public class AdminntApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminntApplication.class, args);
	}

}
