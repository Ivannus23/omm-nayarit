// ---------------- NAV MÓVIL ----------------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav__links--open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
    });
  });
}

// ---------------- BOTÓN "VOLVER ARRIBA" ----------------
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------------- SCROLL SUAVE EN ANCLAS ----------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---------------- CONFIG GOOGLE DRIVE ----------------
// IMPORTANTE:
// 1. Crea una API key en Google Cloud Console para el API de Google Drive.
// 2. Restringe la API key por dominio (por ejemplo, tu dominio de Netlify).
// 3. Pega aquí tu API key y los IDs de carpeta de Drive.

const DRIVE_API_KEY = 'AIzaSyAomAvVn1uLRXhRpce88pei_S1i56bqY28'; // <- reemplaza esto

const DRIVE_FOLDERS = {
  eliminatorio: '1IU6WK9neKo4Vf1HeqjQizfDVs3-hZjXL', 
  semifinal: '1Jcof9IKTOTVq1uDi-cYIMDwlJHuShEZA',       
  final: '13_cKZf5H0X_SFjFRLutstaAUoMT5ZP4l',
  resultados: '153xYVXhLNmz8U_dYCYvhS1brMxWBataa'               
};

// ---------------- FUNCIÓN PARA CARGAR UNA CARPETA ----------------
async function loadDriveFolder(folderId, listEl) {
  if (!DRIVE_API_KEY || !folderId || !listEl) return;

  listEl.innerHTML = '<li class="exams__item exams__item--loading">Cargando exámenes...</li>';

  const query = encodeURIComponent(
    `'${folderId}' in parents and mimeType = 'application/pdf' and trashed = false`
  );
  const fields = encodeURIComponent('files(id,name,webViewLink,createdTime)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=createdTime desc&fields=${fields}&key=${DRIVE_API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Error HTTP ' + res.status);
    }

    const data = await res.json();
    const files = data.files || [];

    if (!files.length) {
      listEl.innerHTML = '<li class="exams__item exams__item--empty">No hay exámenes cargados todavía.</li>';
      return;
    }

    listEl.innerHTML = '';

    files.forEach(file => {
      const li = document.createElement('li');
      li.className = 'exams__item';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = file.name.replace(/\.pdf$/i, '');

      const link = document.createElement('a');
      link.href = file.webViewLink || `https://drive.google.com/file/d/${file.id}/view?usp=sharing`;
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'link';
      link.textContent = 'Ver PDF';

      li.appendChild(nameSpan);
      li.appendChild(link);
      listEl.appendChild(li);
    });
  } catch (error) {
    console.error('Error cargando carpeta de Drive:', error);
    listEl.innerHTML = '<li class="exams__item exams__item--error">No se pudieron cargar los exámenes. Intenta más tarde.</li>';
  }
}

// ---------------- INICIALIZAR CARGA DINÁMICA ----------------
document.addEventListener('DOMContentLoaded', () => {
  const lists = document.querySelectorAll('.js-drive-list');

  lists.forEach(listEl => {
    const tipo = listEl.getAttribute('data-tipo'); // eliminatorio / semifinal / final
    const folderId = DRIVE_FOLDERS[tipo];

    if (folderId) {
      loadDriveFolder(folderId, listEl);
    } else {
      listEl.innerHTML = '<li class="exams__item exams__item--empty">Carpeta no configurada.</li>';
    }
  });
});


// ---------------- FORMULARIO DE CONTACTO (mailto) ----------------
const contactForm = document.getElementById('contactForm');
const contactSubmit = document.getElementById('contactSubmit');
const contactStatus = document.getElementById('contactStatus');

if (contactForm && contactSubmit && contactStatus) {
  contactSubmit.addEventListener('click', () => {
    const nombre = document.getElementById('nombre')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const mensaje = document.getElementById('mensaje')?.value.trim() || '';

    // Limpiar estados previos
    contactStatus.classList.remove('form__note--error', 'form__note--success');

    // Validaciones básicas
    if (!nombre || !email || !mensaje) {
      contactStatus.textContent = 'Por favor completa todos los campos antes de enviar.';
      contactStatus.classList.add('form__note--error');
      return;
    }

    // Validación sencilla de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      contactStatus.textContent = 'Por favor ingresa un correo electrónico válido.';
      contactStatus.classList.add('form__note--error');
      return;
    }

    const destinatario = 'ommnayarit@gmail.com';
    const asunto = 'Consulta desde el sitio OMM Nayarit';
    const cuerpo = `
Nombre: ${nombre}
Correo: ${email}

Mensaje:
${mensaje}
    `.trim();

    const mailtoLink =
      `mailto:${encodeURIComponent(destinatario)}` +
      `?subject=${encodeURIComponent(asunto)}` +
      `&body=${encodeURIComponent(cuerpo)}`;

    // Mostrar mensaje al usuario
    contactStatus.textContent = 'Abriendo tu aplicación de correo...';
    contactStatus.classList.add('form__note--success');

    // Abrir el cliente de correo del usuario
    window.location.href = mailtoLink;
  });
}
