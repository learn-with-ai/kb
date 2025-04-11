---
sidebar_position: 1
tags: ["Metamodeling", "Software Architecture", "MDSD", "Target Architecture", "Platform Architecture", "Architecture Conformance", "Component-Based Development", "Frameworks Integration", "Service-Oriented Architectures", "Business Process Management"]
title: "04_part4.txt"
---

## summary

- The chapter begins with an explanation of metamodeling, specifically the relation between UML::Class and UML::Object as an MOF::Association, defining the instanceof relation in UML models.
- It introduces the concept of software architecture in the context of Model Driven Software Development (MDSD), emphasizing its importance and the various subcontexts it plays a role in, including target architecture, domain architecture, platform architecture, transformation architecture, and tool architecture.
- The chapter outlines the characteristics of a sound architecture, including support for functional and non-functional requirements, simplicity, expandability, and good documentation.
- It discusses how to arrive at a sound architecture, mentioning the use of architectural patterns and styles, and references several books that describe architectures for specific types of systems.
- The section on building blocks for software architecture covers frameworks, middleware, and components, highlighting their relevance in MDSD.
- An architecture reference model is presented, showing a layered structure common in well-structured software systems, with layers including operating system, programming languages & libraries, technical platform/middleware, and business platform.
- The chapter concludes with a discussion on balancing the MDSD platform, emphasizing the importance of reducing the conceptual distance between the MDSD domain and platform to decrease complexity.
- Practical implementation opportunities are flagged, such as the generation of framework adaptations from DSL specifications and the integration of MDSD with component-based development.
- The chapter references several architectural styles and patterns, providing a foundation for understanding software architecture in the context of MDSD.
- Real-world applications and use cases are mentioned, including examples from e-business systems, radio telescopes in astronomy, insurance companies, and distributed embedded systems.
- Important images described in the book include Figure 6.45 showing the instanceof relation defined in UML and Figure 7.1 illustrating popular software architectural styles.
- The chapter discusses the importance of architecture conformance in MDSD, emphasizing that a good target architecture must not be ignored or circumvented in daily project routines.
- It highlights how MDSD ensures architecture conformance through code generation, particularly by enforcing dependencies and access controls as defined in the model.
- The integration of frameworks in MDSD is explored, noting how customized DSLs can simplify and speed up the use of complex frameworks, ensuring correct usage as intended by their inventors.
- The chapter delves into Component-Based Development (CBD) and its interplay with MDSD, presenting a metamodel for component-based development that includes type, composition, and system viewpoints.
- Aspect models are introduced as a way to handle additional system aspects like persistence, authorization, and authentication separately from the core viewpoint models.
- Variations in metamodels for different project needs are discussed, including hierarchical components, component configuration parameters, and asynchronous communication patterns.
- The chapter provides practical implementation opportunities, such as generating component contexts to enforce legal dependencies and using aspect models for specific system aspects.
- Real-world applications of the concepts are implied through the discussion of various component types and their implementations in different domains.
- The importance of iterative, incremental development in MDSD platform design is reiterated, advocating for small frameworks combined with code generation.
- Interesting insights include the use of modern IDEs to inform developers of legal dependencies via code completion, enhancing architecture conformance.
- Important images described in the book include Figure 7.4 showing dependencies between components and Figure 7.5 illustrating the metamodel for components, interfaces, and their dependencies.
- The chapter explores the integration of Service-Oriented Architectures (SOA) and Business Process Management (BPM) with Model-Driven Software Development (MDSD), highlighting their synergy and the central role of models in defining and operating service-oriented systems.
- It discusses the characteristics of SOA, including message-oriented interactions, explicit interaction patterns, quality of service aspects, and the importance of service descriptions and interoperability.
- The chapter also covers BPM, emphasizing its focus on the design and control of business processes, the lifecycle of a business process, and the confusion in the industry regarding BPM products and standards.
- A simplified metamodel for services is presented, illustrating how to connect the SOA 'world' with the component 'world'.
- The intersection of SOA and BPM is examined, noting the conceptual mismatches and the potential for a useful synthesis through the principle of Separation of Concerns.
- The role of MDSD/MDA in providing standards-based modeling of business processes and supporting all layers of an enterprise architecture in a consistent way is highlighted.
- Practical implementation opportunities include the use of models to specify message schemas, interaction patterns, and quality of service contracts, as well as the generation of infrastructure code between layers.
- Real-world applications are implied through the discussion of service enabling and the re-engineering of monolithic legacy applications for SOA-oriented BPM.
- Interesting insights include the critique of the misconception that all systems in SOA must be physically connected through a single technical infrastructure, advocating instead for a 'logical bus' approach.
- Important images described in the book include Figure 7.14 showing subtypes of components to host various kinds of behavioral specifications and Figure 7.15 illustrating a simplified metamodel for services.

## code snippets
```
public class SMSAppImpl {
  public void tueWas() {
    TextEditor editor = (TextEditor)
  Factory.getComponent("TextEditor");
    editor.setText( someText );
    editor.show();
  }
}
public interface SMSAppContext
         extends ComponentContext {
public TextEditorIF getTextEditorIF();
  public SMSIF getSMSIF();
  public MenuIF getMenuIF();
public class SMSAppImpl implements Component {
  private SMSAppContext context = null;
  public void init( ComponentContext ctx) {
    this.context = (SMSAppContext)ctx;
    TextEditor editor =
  context.getTextEditorIF();
```
