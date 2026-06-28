const form = document.getElementById('subscription-form');
        const fieldConfig = [
            { id: 'fullName', label: 'Nombre completo' },
            { id: 'email', label: 'Email' },
            { id: 'password', label: 'Contraseña' },
            { id: 'age', label: 'Edad' },
            { id: 'phone', label: 'Teléfono' },
            { id: 'address', label: 'Dirección' },
            { id: 'city', label: 'Ciudad' },
            { id: 'postalCode', label: 'Código Postal' },
            { id: 'dni', label: 'DNI' }
        ];

        const validators = {
            fullName: value => {
                const trimmed = value.trim();
                const letterCount = (trimmed.match(/\p{L}/gu) || []).length;
                if (!trimmed) return 'El nombre completo es obligatorio.';
                if (letterCount <= 6) return 'El nombre debe tener más de 6 letras.';
                if (!/\s+/.test(trimmed)) return 'Debe contener al menos un espacio entre nombre y apellido.';
                return '';
            },
            email: value => {
                const trimmed = value.trim();
                if (!trimmed) return 'El email es obligatorio.';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(trimmed)) return 'Debe ingresar un email con formato válido.';
                return '';
            },
            password: value => {
                if (!value) return 'La contraseña es obligatoria.';
                if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
                if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'La contraseña debe incluir letras y números.';
                if (!/^[A-Za-z\d]+$/.test(value)) return 'La contraseña solo puede contener letras y números.';
                return '';
            },
            age: value => {
                if (!value) return 'La edad es obligatoria.';
                if (!/^\d+$/.test(value)) return 'La edad debe ser un número entero.';
                const age = Number(value);
                if (age < 18) return 'Debes ser mayor o igual a 18 años.';
                return '';
            },
            phone: value => {
                if (!value) return 'El teléfono es obligatorio.';
                if (!/^\d{7,}$/.test(value)) return 'El teléfono debe tener al menos 7 dígitos y solo números.';
                return '';
            },
            address: value => {
                const trimmed = value.trim();
                if (!trimmed) return 'La dirección es obligatoria.';
                if (trimmed.length < 5) return 'La dirección debe tener al menos 5 caracteres.';
                if (!/[A-Za-z]/.test(trimmed)) return 'La dirección debe contener letras.';
                if (!/\d/.test(trimmed)) return 'La dirección debe contener números.';
                if (!/\s+/.test(trimmed)) return 'La dirección debe incluir al menos un espacio entre calle y número.';
                return '';
            },
            city: value => {
                const trimmed = value.trim();
                if (!trimmed) return 'La ciudad es obligatoria.';
                if (trimmed.length < 3) return 'La ciudad debe tener al menos 3 caracteres.';
                return '';
            },
            postalCode: value => {
                const trimmed = value.trim();
                if (!trimmed) return 'El código postal es obligatorio.';
                if (trimmed.length < 3) return 'El código postal debe tener al menos 3 caracteres.';
                return '';
            },
            dni: value => {
                if (!value) return 'El DNI es obligatorio.';
                if (!/^\d{7,8}$/.test(value)) return 'El DNI debe ser un número de 7 u 8 dígitos.';
                return '';
            }
        };

        const setError = (input, message) => {
            const errorElement = input.parentElement.querySelector('.error-message');
            errorElement.textContent = message;
            input.classList.add('invalid');
        };

        const clearError = input => {
            const errorElement = input.parentElement.querySelector('.error-message');
            errorElement.textContent = '';
            input.classList.remove('invalid');
        };

        const validateInput = input => {
            const validator = validators[input.id];
            const message = validator ? validator(input.value) : '';
            if (message) {
                setError(input, message);
            } else {
                clearError(input);
            }
            return message;
        };

        fieldConfig.forEach(field => {
            const input = document.getElementById(field.id);
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('focus', () => clearError(input));
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            const errors = [];

            fieldConfig.forEach(field => {
                const input = document.getElementById(field.id);
                const message = validateInput(input);
                if (message) {
                    errors.push(`${field.label}: ${message}`);
                }
            });

            if (errors.length > 0) {
                alert('Por favor corrige los siguientes errores:\n' + errors.join('\n'));
                return;
            }

            const formData = new FormData(form);
            const summary = [
                `Nombre completo: ${formData.get('fullName')}`,
                `Email: ${formData.get('email')}`,
                `Contraseña: ${formData.get('password')}`,
                `Edad: ${formData.get('age')}`,
                `Teléfono: ${formData.get('phone')}`,
                `Dirección: ${formData.get('address')}`,
                `Ciudad: ${formData.get('city')}`,
                `Código Postal: ${formData.get('postalCode')}`,
                `DNI: ${formData.get('dni')}`
            ].join('\n');

            alert('Formulario enviado correctamente:\n' + summary);
            form.reset();
        });