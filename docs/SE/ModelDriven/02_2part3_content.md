---
sidebar_position: 1
tags: ["UML Profile", "Code Generation", "Generative Software Architecture", "MDSD", "openArchitectureWare", "Bootstrapping", "Metamodels", "Templates", "Static Semantics", "Domain-Specific Languages", "Formal Models", "Platforms", "Transformations"]
title: "02_2part3"
---

## summary

- The chapter discusses the architecture development aspect of Model Driven Software Development (MDSD), focusing on the creation of a generative software architecture for automating application development.
- It highlights the importance of redundancy avoidance in modern software architectures and the benefits of delegating redundancy into a generative software architecture.
- The chapter introduces the concept of a UML profile for formal MDSD models, explaining how it captures architectural concepts and abstracts from technological details.
- Transformations from model to code are discussed, noting the limitations of XSLT and the use of the openArchitectureWare framework for metaprogramming.
- The process of metamodel/profile implementation is detailed, including how stereotypes and tagged values are mapped to Java classes for code generation.
- Template programming is explained as a method for generating platform-specific implementation skeletons, with examples provided for generating deployment descriptors.
- The mode of operation of the MDSD generator is described, outlining the components such as the design language, UML design, XMI input, metamodel implementation, templates, and generator backend.
- The chapter emphasizes the pivotal role of metamodels in MDSD and mentions the support for polymorphism at the template level in the openArchitectureWare framework.
- Practical implementation opportunities include creating a UML profile, implementing a generative software architecture, and using the openArchitectureWare framework for code generation.
- The chapter provides insights into the differences between AC-MDSD and MDA, highlighting their respective goals of development efficiency and portability/interoperability.
- Images mentioned include Figure 3.7 showing an architecture-centric design for UserRegistration and Figure 3.8 depicting a UML profile definition for the design language.
- The chapter elaborates on the bootstrapping process necessary for creating metamodels, templates, and profiles in Model-Driven Software Development (MDSD).
- It emphasizes the importance of starting with a 'handmade' code as a blueprint before developing templates, to ensure a solid foundation for the generative software architecture.
- The process of transferring static code fragments to templates and working out variable parts with the help of the template language based on the metamodel is detailed.
- Adaptations to the generative software architecture are discussed, highlighting how changes in architectural aspects can be efficiently managed through modifications in templates rather than manual adaptations across the application.
- The chapter introduces the concept of protected regions in the MDSD generator, which allows for the preservation of manually-developed business logic during regeneration.
- Structuring metaprograms is addressed, emphasizing the need for mechanisms like object-orientation to ensure the software can grow iteratively and incrementally.
- The conclusion reflects on the practicality of architecture-centric MDSD, dispelling myths about limitations on personal freedom and the fear of being locked in by generator suppliers.
- The importance of tool support for the successful use of AC-MDSD is highlighted, with a call for better UML tool support for distributed modeling, profiling, generator integration, and OCL constraint support.
- The chapter also touches on the broader context of MDSD, mentioning other variants like profiles for business-related domains and their higher generation potential.
- Images mentioned include Figure 3.11 showing an extended EntityObject User and Figure 3.12 depicting a profile definition with constraints.
- The chapter introduces the concept of static semantics in language design, emphasizing its role in determining well-formedness criteria beyond what syntax can define.
- It explores Domain-Specific Languages (DSLs), highlighting their purpose in formalizing key domain aspects for modeling, requiring a metamodel, static semantics, and concrete syntax.
- Formal models in MDSD are discussed as instances of a DSL's metamodel, serving as the basis for automated transformations and requiring clear semantics for both modelers and transformations.
- The role of platforms in MDSD is explained, detailing how they support the realization of domains by simplifying transformations and can be built on various building blocks like middleware and frameworks.
- Transformations in MDSD are categorized into model-to-model and model-to-platform, with the latter often involving code generation and leveraging platform-specific idioms.
- The concept of a domain architecture is introduced as a central MDSD concept, combining a domain's metamodel, platform, and transformations to automate the transition from model to product.
- Software system families and product lines are discussed in the context of MDSD, illustrating how domain architectures enable the creation of varied products within a family.
- The Model-Driven Architecture (MDA) is positioned within MDSD, noting its use of MOF for metamodel definition and emphasis on UML profiles and OCL for DSLs.
- Architecture-Centric MDSD (AC-MDSD) is highlighted as a focus of the book, with its terminology properly introduced and classified within the general MDSD context.
- Images mentioned include Figure 4.2 showing concept formation around platforms, Figure 4.3 detailing transformations, Figure 4.4 illustrating domain, product line, and software system family relationships, Figure 4.5 placing MDA concepts within MDSD, and Figure 4.6 classifying AC-MDSD concepts.

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
public class EntityObject extends JavaObject {
  public String KeyType = "USER"; //TaggedValue Default
  ...
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
