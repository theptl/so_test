package com.test01;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.test01"})
@MapperScan("com.test01")
public class NewTest01Application {

	public static void main(String[] args) {
		SpringApplication.run(NewTest01Application.class, args);
	}

}
