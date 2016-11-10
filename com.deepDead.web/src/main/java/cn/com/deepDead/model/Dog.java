package cn.com.deepDead.model;

import java.io.Serializable;
import java.util.Date;

import org.springframework.stereotype.Repository;

import cn.com.deepDead.util.JsonDateSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
@Repository
public class Dog implements Serializable,Ibase{
	private static final long serialVersionUID = 567987678L;
	private String name;
	private Integer age;
	private Date birthDay;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getBirthDay() {
		return birthDay;
	}
	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}
	@Override
	public String toString() {
		return "Dog [name=" + name + ", age=" + age + ", birthDay=" + birthDay
				+ "]";
	}
	@Override
	public void doFly() {
		System.out.println("Dog doFly");
	}
	
}
