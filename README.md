# Установка:
## ПО:
- ##### git:
	- перейдите по [ссылке](https://git-scm.com/install/windows) и установите git для вашей операционной системы
	- откройте терминал и пропишите
		- Windows: `git config credential.helper`, если не выдало `manager`, то пропишите `git config set credential.helper manager` 
		- MacOS: `git config --global credential.helper osxkeychain`
	- откройте терминал и пропишите
		``` Bash
		  cd path/to/directory #перейти в директории, в которую вы хотите склонировать репозиторий
		  
		  git clone https://github.com/Aukvary/NSU-Summary.git
		  ```
