var builder = WebApplication.CreateBuilder(args);

// Adiciona política de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Adiciona suporte a controllers
builder.Services.AddControllers();

// Adiciona serviços do Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ativa o Swagger em ambiente de produção
app.UseSwagger();
app.UseSwaggerUI();

// app.UseHttpsRedirection();
app.UseRouting();

// Usa o CORS antes do MapControllers
app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();