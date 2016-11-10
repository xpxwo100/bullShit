package cn.com.deepDead.util;

import java.sql.Types;

import org.hibernate.dialect.SQLServer2008Dialect;
import org.hibernate.type.StandardBasicTypes;
//Hibernate 字段映射
public class SQLServerNativeDialect extends SQLServer2008Dialect {
	public SQLServerNativeDialect() {
		super();
		// very important, mapping char(n) to String
		// 存在bug,只能写一个自定义方言处理
		// 常量在数据库中被认为是CHAR类型的，Hibernate取值时将其保存为Character类型，
		// 而Character只能保存一个字符，所以造成返回值中只存在一个字符。Hibernate官方已存在此bug ，却从未修复
		//左边数据库类型 右边java类型
		registerHibernateType(Types.CHAR, StandardBasicTypes.STRING.getName());
        registerHibernateType(Types.NCHAR, StandardBasicTypes.STRING.getName());
        //支持nvarchar字段的SQL查询
        registerHibernateType(Types.VARCHAR, StandardBasicTypes.STRING.getName());
        registerHibernateType(Types.NVARCHAR, StandardBasicTypes.STRING.getName());
        registerHibernateType(Types.LONGNVARCHAR, StandardBasicTypes.STRING.getName());
        registerHibernateType(Types.LONGVARCHAR, StandardBasicTypes.STRING.getName());
        registerHibernateType(Types.VARBINARY, StandardBasicTypes.BINARY.getName());
        registerHibernateType(Types.DECIMAL, StandardBasicTypes.DOUBLE.getName());
        registerHibernateType(Types.NUMERIC, StandardBasicTypes.BIG_DECIMAL.getName());
	}
}
