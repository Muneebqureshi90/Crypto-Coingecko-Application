package com.trading_app.config;


import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;


//    Now Doing this with Annoutation

@Configuration

//Add SecuritySchemem on which Class we Required
//@SecurityRequirement()

@SecurityScheme(
        name = "scheme1",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)

@OpenAPIDefinition(
        info = @Info(
                title = "ItsMy Crypto Application",
                version = "1.0.0",
                description = "ItsMy Crypto Project for Learning",
                termsOfService = "Just For Practice",
                contact = @Contact(
                        name = "Muneeb Qureshi",
                        email = "Muneebhaider564@gmail.com",
                        url = "https://Muneebhaider564@gmail.com"
                ),
                license = @License(
                        name = "Licence",
                        url = "Muneeb"
                )
        ),
        externalDocs = @ExternalDocumentation(
                description = "This is Extrnal Document",
                url = "https://Muneebhaider564@gmail.com"
        )

)


public class SwaggerConfig {



//    Now Doing this without Annoutation

/*
    @Bean
    public OpenAPI springShopOpenAPI() {

        String schemeName="bearerScheme";

        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement()
                        .addList(schemeName)
                )
                .components(new Components()

                        .addSecuritySchemes(schemeName,new SecurityScheme()
                                .name(schemeName)
                                .type(SecurityScheme.Type.HTTP)
                                .bearerFormat("JWT")
                                .scheme("bearer")
                        )
                )

                .info(new Info()
                        .title("Blogging Application")
                        .description("Blogging Data")
                        .version("v0.0.1")
                        .contact(new Contact()
                                .name("Muneeb Qureshi")
                                .email("Muneebhaider564@gmail.com")
                                .url("https://instagram.com/muneebqureshi90?igshid=OGQ5ZDc2ODk2ZA=="))
                        .license(new License()
                                .name("license")
                                .url("")))
                .externalDocs(new ExternalDocumentation()
                        .description("")
                        .url(""));
    }
*/

/*

    If we have two different URLs

    @Bean
    public List<GroupedOpenApi> apis() {
        return Arrays.asList(
                // Group for public endpoints (replace with your actual package and path)
                GroupedOpenApi.builder()
                        .group("blog-public")
                        .packagesToScan("com.example.blog.public.controller")
                        .pathsToMatch("/api/public/**")

                        .build(),

                // Group for admin endpoints (replace with your actual package and path)
                GroupedOpenApi.builder()
                        .group("blog-admin")
                        .packagesToScan("com.example.blog.admin.controller")
                        .pathsToMatch("/api/admin/**")
                        .build()
        );}*/
    }

