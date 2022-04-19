package com.test01;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

@SpringBootTest
@ComponentScan({"com.test01"})
@MapperScan("com.test01")
class NewTest01ApplicationTests {

	public static void main(String[] args) {
		SpringApplication.run(NewTest01ApplicationTests.class, args);
	}

}
