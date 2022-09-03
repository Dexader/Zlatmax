// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss 
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {

	const rangeItems = document.querySelectorAll('[data-range]');
	if(rangeItems.length) {
		rangeItems.forEach(rangeItem => {
			const fromValue = rangeItem.querySelector('[data-range-from]');
			const toValue = rangeItem.querySelector('[data-range-to]');
			const slider = rangeItem.querySelector('[data-range-item]');
			let inputs = [fromValue, toValue];
			noUiSlider.create(slider, {
				start: [20, 80],
				connect: true,
				format: {
					to: function (value) {
						return Math.round(value);
					},
					from: function (value) {
						return Number(value);
					}
				},
				tooltips: true,
				range: {
					'min': [0],
					'max': [10000]
				}
			});

			inputs.forEach(function (input, handle) {

				input.addEventListener('change', function () {
					slider.noUiSlider.setHandle(handle, this.value);
				});

				input.addEventListener('keydown', function (e) {

					var values = slider.noUiSlider.get();
					var value = Number(values[handle]);

					var steps = slider.noUiSlider.steps();

					var step = steps[handle];

					var position;

					switch (e.which) {

						case 13:
							slider.noUiSlider.setHandle(handle, this.value);
							break;

						case 38:

							// Get step to go increase slider value (up)
							position = step[1];

							if (position === false) {
								position = 1;
							}

							if (position !== null) {
								slider.noUiSlider.setHandle(handle, value + position);
							}

							break;

						case 40:

							position = step[0];

							if (position === false) {
								position = 1;
							}

							if (position !== null) {
								slider.noUiSlider.setHandle(handle, value - position);
							}

							break;
					}
				});
			});

			slider.noUiSlider.on('update', function (values, handle) {
				inputs[handle].value = values[handle];
			});
		});
	}

}
rangeInit();
