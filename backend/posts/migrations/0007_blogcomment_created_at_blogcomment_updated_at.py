# Generated by Django 4.2.6 on 2023-10-24 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_blogcomment_commentlike'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogcomment',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='blogcomment',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
