CREATE TABLE [dbo].[Contacts] (
    [ID_Contact] INT          IDENTITY (1, 1) NOT NULL,
    [Email]      VARCHAR (50) NOT NULL,
    [FirstName]  VARCHAR (50) NOT NULL,
    [LastName]   VARCHAR (50) NOT NULL,
    [Phone]      VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED ([ID_Contact] ASC)
);

