PROJECT = adventureflashcards

INSTALL_DIR = ${DESTDIR}/usr/share/$(PROJECT)
DESKTOP_DIR = ${DESTDIR}/usr/share/applications
ICON_DIR    = ${DESTDIR}/usr/share/pixmaps

all:
	@echo "Nothing to build"

install:
	mkdir -p $(INSTALL_DIR)/
	cp -a audio css html fonts images js _locales $(INSTALL_DIR)/
	cp index.html LICENSE manifest.json icon.png $(INSTALL_DIR)/
	mkdir -p $(DESKTOP_DIR)/
	cp $(PROJECT).desktop $(DESKTOP_DIR)/
	mkdir -p $(ICON_DIR)/
	cp icon.png $(ICON_DIR)/$(PROJECT).png
