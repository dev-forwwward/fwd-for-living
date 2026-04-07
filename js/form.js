export function form() {

    // Form validation
    if (document.querySelector('.section_contact_form')) {
        $("form").each(function (e) {
            $.validator.addMethod("letters", function (value, element) {
                return this.optional(element) || value == value.match(/^[a-zA-Z\s]*$/);
            });
            $.validator.addMethod("customEmail", function (value, element) {
                return (
                    this.optional(element) || /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)
                );
            });

            // Disable native HTML5 validation
            $(this).attr('novalidate', 'novalidate');
            $(this).validate({
                rules: {
                    yourname: {
                        required: true
                    },
                    youremail: {
                        required: true,
                        email: true,
                        customEmail: true, // Add the customEmail validation
                    }
                },
                messages: {
                    youremail: {
                        required: window.location.pathname.includes('/it') ? "Questo campo è obbligatorio" : "This field is required.",
                        email: window.location.pathname.includes('/it') ? "Email non valida" : "Invalid email",
                        customEmail: window.location.pathname.includes('/it') ? "Email non valida" : "Invalid email"
                    },
                    yourname: {
                        required: window.location.pathname.includes('/it') ? "Questo campo è obbligatorio" : "This field is required.",
                        letters: window.location.pathname.includes('/it') ? "Nome non valido" : "Invalid name"
                    },
                    "Contact-Topic": window.location.pathname.includes('/it') ? "Questo campo è obbligatorio" : "This field is required.",
                    yourmessage: window.location.pathname.includes('/it') ? "Questo campo è obbligatorio" : "This field is required."
                },
                errorPlacement: function (error, element) {
                    // Find the field wrapper using jQuery
                    const fieldWrapper = element.closest('.form8_field-wrapper');

                    if (fieldWrapper.length) {
                        // Find the existing label-error-wrapper
                        const labelErrorWrapper = fieldWrapper.find('.label-error-wrapper');

                        if (labelErrorWrapper.length) {
                            // Append error to the existing wrapper
                            labelErrorWrapper.append(error);
                            setTimeout(() => {
                                error[0].classList.add("show");
                            }, 200);
                            return;
                        }
                    }

                    // Fallback to default behavior
                    error.insertAfter(element);
                    setTimeout(() => {
                        error[0].classList.add("show");
                    }, 200);
                },
            });
        });
    }

    // Radio Button
    document.querySelectorAll('.s_cfo_radio_elm').forEach((input) => {
        input.addEventListener('change', () => {
            // Remove selected class from all s_cfo_radio elements
            document.querySelectorAll('.s_cfo_radio').forEach((radio) => {
                radio.classList.remove('selected');
            });

            // Add selected class to the parent .s_cfo_radio of the checked input
            const parent = input.closest('.s_cfo_radio');
            if (parent) {
                parent.classList.add('selected');
            }
        });
    });
}