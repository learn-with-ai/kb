---
sidebar_position: 1
tags: ["UML Profile", "Generative Software Architecture", "Model Driven Software Development (MDSD)", "openArchitectureWare", "XMI", "Bootstrapping", "Metamodel", "MDSD Generator", "Domain-Specific Languages (DSL)", "Static Semantics", "Platforms", "Transformations", "Software System Families"]
title: "original_part2-fullhistory.txt"
---

## summary

- The chapter discusses the application of Model Driven Software Development (MDSD) in creating a typical web application, emphasizing the benefits of generative approaches in reducing errors and enhancing development efficiency.
- It highlights the trade-off between platform independence and the integration of manually-written business logic code, which introduces dependencies on specific programming languages and frameworks.
- The concept of redundancy avoidance in software architectures is introduced as a key principle, aiming to delegate redundancy into a generative software architecture for increased productivity.
- The chapter details the creation of a UML profile for formal MDSD models, including the use of stereotypes and tagged values to extend standard UML with domain-specific concepts.
- Transformations from model to code are explored, with a focus on the limitations of XSLT and the advantages of using specialized MDSD tools like openArchitectureWare for code generation.
- The process of metamodel/profile implementation in Java is described, illustrating how design models are transformed into Java object graphs for generator templates.
- Template programming is presented as a method for generating platform-specific implementation skeletons, with examples of template language usage for generating deployment descriptors.
- The mode of operation of the MDSD generator is explained, detailing the components of the generative software architecture and their functions in processing UML designs into generated code.
- The chapter concludes with insights into the importance of metamodels in MDSD and previews a deeper exploration in subsequent chapters.
- Important images mentioned include Figure 3.7 showing an architecture-centric design for UserRegistration, Figure 3.8 depicting a UML profile definition, and Figure 3.10 illustrating the operation of the openArchitectureWare framework.
- The chapter delves into the bootstrapping process necessary for creating metamodels, templates, and profiles in Model-Driven Software Development (MDSD), emphasizing the importance of starting with a runnable reference implementation.
- It discusses the adaptability of the generative software architecture to changes in functional and architectural requirements, highlighting the efficiency of making changes in a single place within the MDSD generator.
- The introduction of a tagged value for business classes, labeled KeyType, is explained as a method to determine the type of a business class's unique key, showcasing the flexibility of MDSD in accommodating new requirements.
- The boundary between infrastructure code and manually-developed business logic is explored, with a focus on the use of protected regions to maintain business logic during iterative regeneration and structural changes.
- The structuring of metaprograms is discussed, advocating for the use of object-oriented mechanisms like components, inheritance, and polymorphism to manage the complexity of MDSD transformations.
- The chapter concludes with an outlook on the practicality of architecture-centric MDSD, addressing common skepticism and highlighting the need for better tool support to realize the full potential of MDSD.
- A transition to concept formation in MDSD is introduced, setting the stage for a unified terminology and conceptual superstructure to enhance understanding and communication in the field.
- The importance of domains in MDSD is underscored, with examples provided to illustrate how domains can be technically or professionally motivated and further divided into subdomains.
- The role of metamodels in formalizing the structure of a domain is explained, with the UML profile from a previous section serving as an example of a domain-specific metamodel.
- The concept of meta meta models is introduced as the foundation for defining metamodels, highlighting its significance for tool integrators and the standardization of modeling languages.
- The distinction between abstract and concrete syntax in modeling languages is clarified, with examples from XML and UML to illustrate how different notations can share a common abstract syntax.
- The chapter explores the concept formation in Model-Driven Software Development (MDSD), focusing on the importance of static semantics in defining the well-formedness criteria of a language.
- It introduces Domain-Specific Languages (DSL) as tools for formally expressing key aspects of a domain, highlighting the necessity of both a metamodel and concrete syntax for their definition.
- Formal models are discussed as instances of DSLs, serving as the basis for automated transformations, with examples ranging from architecture-centric designs to Java programs.
- The role of platforms in MDSD is examined, emphasizing their support for the realization of domains through transformations or interpretations, with examples including J2EE and Apache Struts.
- Transformations are categorized into model-to-model and model-to-platform, detailing how they implement the semantics of DSLs and utilize platform idioms for efficient code generation.
- The concept of software system families is introduced, illustrating how domain architectures enable the creation of a set of products that share common technical foundations.
- Model-Driven Architecture (MDA) is positioned within the MDSD framework, noting its specialization characteristics such as the use of MOF as a meta meta model and the recommendation of UML profiles for DSLs.
- Architecture-Centric MDSD (AC-MDSD) is classified within the broader MDSD context, highlighting its focus on generative architectures and the integration of non-generated artifacts like code snippets.
- The chapter underscores the significance of domain architectures in MDSD, which aggregate metamodels, platforms, and transformations to facilitate the transition from models to products.
- It concludes with a discussion on the flexibility required in domain architectures to accommodate the variabilities among products within a software system family, ensuring reusability across different contexts.

## code snippets
```
public class EntityObject extends Class
{}
public class Key extends Attribute
{}
«DEFINE DeplDescr FOR EntityObject»
  «FILE FullPathName"/"Name"jbossDD.xml"»
    <entity>
      <ejb-name>«Name»EJB</ejb-name>
       «IF needsRemote»
         <jndi-name>
           «FullPackageName».«Name»RemoteHome
         </jndi-name>
       «ENDIF»
       <local-jndi-name>
         «FullPackageName».«Name»Home
       </local-jndi-name>
    </entity>
  «ENDFILE»
«ENDDEFINE»
<weblogic-enterprise-bean>
  <ejb-name>UserEJB</ejb-name>
  <entity-descriptor>
<persistence>
      <persistence-use>
<type-identifier>
WebLogic_CMP_RDBMS
</type-identifier>
        <type-version>6.0</type-version>
        <type-storage>
          META-INF/weblogic-cmp-rdbms-jar.xml
        </type-storage>
      </persistence-use>
    </persistence>
  </entity-descriptor>
  <local-jndi-name>
    de.amg.carsharing.user.entity.UserHome
  </local-jndi-name>
</weblogic-enterprise-bean>
«DEFINE DeplDescr FOR EntityObject»
«FILE FullPathName"/"Name"weblogic-ejb-jarDD.xml"»
  <weblogic-enterprise-bean>
    <ejb-name>«Name»EJB</ejb-name>
 <entity-descriptor>
      <persistence>
        <persistence-use>
          <type-identifier>
            WebLogic_CMP_RDBMS
          </type-identifier>
          <type-version>6.0</type-version>
        
 <type-storage>
            META-INF/weblogic-cmp-rdbms-jar.xml
          </type-storage>
        </persistence-use>
      </persistence>
  
 </entity-descriptor>
    «IF needsRemote»
      <jndi-name>
        «FullPackageName».«Name»RemoteHome
      </jndi-name>
    «ENDIF»
    <local-jndi-name>
      «FullPackageName».«Name»Home
    </local-jndi-name>
  </weblogic-enterprise-bean>
«ENDFILE»
«ENDDEFINE»
public class EntityObject extends JavaObject {
  public String KeyType = "USER"; //TaggedValue Default
  ...
  // EntityObject.CheckConstraints() 
  // defines the DesignConstraints for
  // Elements with stereotype <<EntityObject>>
  public String CheckConstraints()throws DesignException {
    if( Key().isEmpty() && 
        KeyType.equals("USER")) {
      throw new DesignException("Constraint "+
            +"violation: No Key found for "+
            +"EntityObject '" + this.Name() + "'");
    }
    return "";
  }
  ...
}
«IF KeyType == "SYSTEM"»
  // init-method
  private void init() {
    long time;
    time = System.currentTimeMillis();
    setImplId(String.valueOf(time) + "+" + 
              System.identityHashCode(this));
  }
  public «Name»PK ejbCreate() throws CreateException {
    init();
    ...
«ELSE»«REM KeyType==”USER”»
   public «Name»PK ejbCreate(
          «EXPAND Attribute::Signature FOREACH Key 
                             USING SEPARATOR ", "») 
           throws CreateException {
     «FOREACH Key AS CurKey EXPAND USING SEPARATOR "\n"»
       setImpl«CurKey»(«CurKey.asPARA»);
     «ENDFOREACH»
     ...
«ENDIF»
«PROTECT CSTART "//" CEND "" ID Id"Operation_MethodBody"»
  //add custom initialization here ...
«ENDPROTECT»
```
