#Comentario

#Permite visualizar todos os databases q existem no BD
show databases;
#Permite apagar um database e toda a sua estrutura de tabelas e dados
drop database dbcontatos20222;
#Perminte criar um novo databse no BD
create database db_lion_school;

#Permite usar a tabelaa
use bd_lion_school;

create table tbl_aluno(

id int  UNSIGNED not null auto_increment primary key,
nome varchar (80) not null,
foto varchar (100)  not null,
sexo varchar(1),
rg varchar(15) not null,
cpf varchar (18) not null,
email varchar(256) not null,               
telefone varchar (19),
celular varchar(19),
data_nascimento date not null,
unique index(id)




);

#permite apagar uma tabela 

create table tbl_curso(

id int  UNSIGNED not null auto_increment primary key,
nome varchar (50) not null,
disciplinas varchar (130) not null,
carga_horaria int not null,
icone varchar (200),
sigla varchar (7),
unique index (id)




);

create table tbl_aluno_curso(
id int  unsigned not null auto_increment primary key,
id_aluno int unsigned not null,
id_curso int unsigned not null,
matricula varchar (15),
status_aluno varchar (10) not null,


#programacao para definir a chave estrangeira 
foreign key(id_aluno) #define qual atributo sera uma fk
	references tbl_aluno(id),#define onde vira a pk
foreign key (id_curso)#define qual atributo sera uma fk
		references tbl_curso(id),##define onde vira a pk

	unique index(id)
);

#Permite visulaizzar tdos os dados de todas as collunas de uma tebela

select * from tbl_aluno; 


#Permite inserir dados dentro de uma tabela
insert into tbl_aluno(nome, 
					  foto,
                      sexo,
                      rg,
                      cpf,
                      email,
                      telefone,
                      celular,
                      data_nascimento)
	values 			  ('José da Silva', 'https://uploads.metropoles.com/wp-content/uploads/2022/07/22153152/Caneta-azul-1-600x400.jpg', 
					  'M',
					  '34.456.666.-1',
					  '300.567.456-23',
					  'jose@gmail.com',
					  '011 4556-7777',
					  '011 9 369-8349',
					  '1965-04-10'
						);
                        
                        
                        
                        
insert into tbl_aluno(nome, 
					  foto,
                      sexo,
                      rg,
                      cpf,
                      email,
                      telefone,
                      celular,
                      data_nascimento)
	values 			  ('Maria Arrivalda Rodrigues', 'https://twitter.com/DenioDeninhobh/status/621794137487114241/photo/1', 
					  'F',
					  '34.436.765.-1',
					  '312.557.556-73',
					  'maria@gmail.com',
					  '011 4556-9823',
					  '011 9 987-8349',
					  '1965-05-20'
						);    
                        
                        
 #Permite alterar um valor de um atrivuto da tabela
 #Obs: sempre devemos especificar qual sera o registro que vai sofrer a alteracao 
 #gerlamente sempre sera apk
 update tbl_aluno set rg = '53.763.32-5' where id = 1;       
 
 delete from tbl_aluno where id = 1;
 
 select * from tbl_aluno;

show tables ;


