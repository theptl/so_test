package com.study01;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.study01"})
@MapperScan("com.study01")
public class Study01Application {

	public static void main(String[] args) {
		SpringApplication.run(Study01Application.class, args);
	}

}
