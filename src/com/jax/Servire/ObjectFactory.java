
package com.jax.Servire;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

/**
 * This object contains factory methods for each Java content interface and Java
 * element interface generated in the com.jax.Servire package.
 * <p>
 * An ObjectFactory allows you to programatically construct new instances of the
 * Java representation for XML content. The Java representation of XML content
 * can consist of schema derived interfaces and classes representing the binding
 * of schema type definitions, element declarations and model groups. Factory
 * methods for each of these are provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

	private final static QName _LoginResponse_QNAME = new QName("http://DataService/", "LoginResponse");
	private final static QName _ExcuteResponse_QNAME = new QName("http://DataService/", "ExcuteResponse");
	private final static QName _Login_QNAME = new QName("http://DataService/", "Login");
	private final static QName _Excute_QNAME = new QName("http://DataService/", "Excute");

	/**
	 * Create a new ObjectFactory that can be used to create new instances of
	 * schema derived classes for package: com.jax.Servire
	 * 
	 */
	public ObjectFactory() {
	}

	/**
	 * Create an instance of {@link LoginResponse }
	 * 
	 */
	public LoginResponse createLoginResponse() {
		return new LoginResponse();
	}

	/**
	 * Create an instance of {@link Excute }
	 * 
	 */
	public Excute createExcute() {
		return new Excute();
	}

	/**
	 * Create an instance of {@link Login }
	 * 
	 */
	public Login createLogin() {
		return new Login();
	}

	/**
	 * Create an instance of {@link ExcuteResponse }
	 * 
	 */
	public ExcuteResponse createExcuteResponse() {
		return new ExcuteResponse();
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link LoginResponse }
	 * {@code >}}
	 * 
	 */
	@XmlElementDecl(namespace = "http://DataService/", name = "LoginResponse")
	public JAXBElement<LoginResponse> createLoginResponse(LoginResponse value) {
		return new JAXBElement<LoginResponse>(_LoginResponse_QNAME, LoginResponse.class, null, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link ExcuteResponse
	 * }{@code >}}
	 * 
	 */
	@XmlElementDecl(namespace = "http://DataService/", name = "ExcuteResponse")
	public JAXBElement<ExcuteResponse> createExcuteResponse(ExcuteResponse value) {
		return new JAXBElement<ExcuteResponse>(_ExcuteResponse_QNAME, ExcuteResponse.class, null, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Login }
	 * {@code >}}
	 * 
	 */
	@XmlElementDecl(namespace = "http://DataService/", name = "Login")
	public JAXBElement<Login> createLogin(Login value) {
		return new JAXBElement<Login>(_Login_QNAME, Login.class, null, value);
	}

	/**
	 * Create an instance of {@link JAXBElement }{@code <}{@link Excute }
	 * {@code >}}
	 * 
	 */
	@XmlElementDecl(namespace = "http://DataService/", name = "Excute")
	public JAXBElement<Excute> createExcute(Excute value) {
		return new JAXBElement<Excute>(_Excute_QNAME, Excute.class, null, value);
	}

}
