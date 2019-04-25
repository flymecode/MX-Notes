### 配置

```java
@Configuration
// 开启Swagger
@EnableSwagger2
public class SwaggerConfiguration {
    @Bean
    public Docket createRestApi() {
        // 设置响应信息
        List<ResponseMessage> responseMessageList = new ArrayList<>();
        // HttpCodeEnum是我们自己定义的
        responseMessageList.add(new ResponseMessageBuilder().code(HttpCodeEnum.OK.getCode()).message(HttpCodeEnum.OK.getMessage()).build());
        responseMessageList.add(new ResponseMessageBuilder().code(HttpCodeEnum.FAIL.getCode()).message(HttpCodeEnum.FAIL.getMessage()).build());
        responseMessageList.add(new ResponseMessageBuilder().code(HttpCodeEnum.UNAUTHORIZED.getCode()).message(HttpCodeEnum.UNAUTHORIZED.getMessage()).build());
        responseMessageList.add(new ResponseMessageBuilder().code(HttpCodeEnum.FORBIDDEN.getCode()).message(HttpCodeEnum.FORBIDDEN.getMessage()).build());
        responseMessageList.add(new ResponseMessageBuilder().code(HttpCodeEnum.SERVER_ERROR.getCode()).message(HttpCodeEnum.SERVER_ERROR.getMessage()).build());


        return new Docket(DocumentationType.SWAGGER_2)
            // 添加我们自定义的相应信息
            .globalResponseMessage(RequestMethod.GET, responseMessageList)
            .globalResponseMessage(RequestMethod.POST, responseMessageList)
            .globalResponseMessage(RequestMethod.PUT, responseMessageList)
            .globalResponseMessage(RequestMethod.DELETE, responseMessageList)
			// 设置界面信息
            .apiInfo(apiInfo())
            .select()
            // 指定扫描的包
            .apis(RequestHandlerSelectors.basePackage("edp.davinci.controller"))
            .paths(PathSelectors.any())
            .build()
            // 设置密钥
            .securitySchemes(Lists.newArrayList(apiKey()));

    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("davinci api")
            .version("1.0")
            .build();
    }

    private ApiKey apiKey() {
        return new ApiKey(Consts.TOKEN_HEADER_STRING, Consts.TOKEN_HEADER_STRING, "header");
    }

}
```



```java
@Api(value = "/users", tags = "users", produces =MediaType.APPLICATION_JSON_UTF8_VALUE)
@ApiResponses(@ApiResponse(code = 404, message = "user not found"))
@RestController
```

常用注解说明

```java
/**
 @Api：修饰整个类，描述Controller的作用
 @ApiOperation：描述一个类的一个方法，或者说一个接口
 @ApiParam：单个参数描述
 @ApiModel：用对象来接收参数
 @ApiProperty：用对象接收参数时，描述对象的一个字段
 @ApiResponse：HTTP响应其中1个描述
 @ApiResponses：HTTP响应整体描述
 @ApiIgnore：使用该注解忽略这个API
 @ApiError ：发生错误返回的信息
 @ApiImplicitParam：一个请求参数
 @ApiImplicitParams：多个请求参数
 */
```

