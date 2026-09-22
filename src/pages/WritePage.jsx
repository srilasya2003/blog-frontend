import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function WritePage() {
	const [formData, setFormData] = useState({
		title: '',
		category: '',
		content: '',
	})
	const [imagePreview, setImagePreview] = useState('')
	const [imageName, setImageName] = useState('')
	const [status, setStatus] = useState('')
	const imageInputRef = useRef(null)

	function handleChange(event) {
		const { name, value } = event.target

		setFormData((previous) => ({
			...previous,
			[name]: value,
		}))
		setStatus('')
	}

	function handleImageChange(event) {
		const file = event.target.files[0]

		if (!file) {
			setImagePreview('')
			setImageName('')
			return
		}

		setImageName(file.name)
		setImagePreview(URL.createObjectURL(file))
		setStatus('')
	}

	function removeImage() {
		setImagePreview('')
		setImageName('')
		setStatus('')

		if (imageInputRef.current) {
			imageInputRef.current.value = ''
		}
	}

	function handleSubmit(event) {
		event.preventDefault()

		if (!formData.title.trim() || !formData.category || !formData.content.trim()) {
			setStatus('Add a title, category, and story before publishing.')
			return
		}

		setStatus('Your post is ready to connect to the publishing API.')
	}

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<Navbar />

			<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
							Create something worth reading
						</p>
						<h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
							Write a new story
						</h1>
						<p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
							Turn your perspective into a thoughtful post for the Brightline community.
						</p>
					</div>

					<Link
						className="text-sm font-semibold text-cyan-700 transition hover:text-cyan-900"
						to="/home"
					>
						Back to home
					</Link>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_360px]">
						<section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
							<div className="space-y-6">
								<div>
									<label
										className="mb-2 block text-sm font-semibold text-slate-800"
										htmlFor="post-title"
									>
										Title <span className="text-red-500">*</span>
									</label>
									<input
										className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-lg font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
										id="post-title"
										name="title"
										onChange={handleChange}
										placeholder="Give your story a clear title"
										type="text"
										value={formData.title}
									/>
								</div>

								<div>
									<label
										className="mb-2 block text-sm font-semibold text-slate-800"
										htmlFor="post-category"
									>
										Category <span className="text-red-500">*</span>
									</label>
									<select
										className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
										id="post-category"
										name="category"
										onChange={handleChange}
										value={formData.category}
									>
										<option value="">Choose a category</option>
										<option value="design">Design</option>
										<option value="technology">Technology</option>
										<option value="writing">Writing</option>
										<option value="product">Product</option>
										<option value="culture">Culture</option>
									</select>
								</div>

								<div>
									<label
										className="mb-2 block text-sm font-semibold text-slate-800"
										htmlFor="post-content"
									>
										Your story <span className="text-red-500">*</span>
									</label>
									<textarea
										className="min-h-96 block w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
										id="post-content"
										name="content"
										onChange={handleChange}
										placeholder="Start writing your thoughts here..."
										value={formData.content}
									/>
									<p className="mt-2 text-xs text-slate-500">
										{formData.content.length} characters
									</p>
								</div>
							</div>

							{status && (
								<p className="mt-6 rounded-xl bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-800">
									{status}
								</p>
							)}

							<div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
								<Link
									className="text-center text-sm font-semibold text-slate-500 transition hover:text-slate-900 sm:text-left"
									to="/home"
								>
									Cancel
								</Link>
								<div className="flex flex-col gap-3 sm:flex-row">
									<button
										className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
										type="button"
										onClick={() => setStatus('Draft saved locally for now.')}
									>
										Save draft
									</button>
									<button
										className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
										type="submit"
									>
										Publish story
									</button>
								</div>
							</div>
						</section>

						<aside className="space-y-6">
							<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<h2 className="text-lg font-semibold text-slate-950">Cover image</h2>
								<p className="mt-2 text-sm leading-6 text-slate-500">
									Add an image to make your story easier to discover. You can connect this field to Django with FormData later.
								</p>

								<label
										className="relative mt-5 flex min-h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center transition hover:border-cyan-400 hover:bg-cyan-50"
									htmlFor="post-image"
								>
									{imagePreview ? (
											<div className="relative h-40 w-full">
												<img
													alt="Selected cover preview"
													className="h-full w-full object-cover"
													src={imagePreview}
												/>
												<button
													aria-label="Remove cover image"
													className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 p-0.5 shadow-md transition hover:scale-105"
													onClick={(event) => {
														event.preventDefault()
														event.stopPropagation()
														removeImage()
													}}
													type="button"
													title="Remove image"
												>
													<img alt="" className="h-full w-full object-contain" src="/remove.png" />
												</button>
											</div>
									) : (
										<div className="flex min-h-40 w-full flex-col items-center justify-center px-4">
											<span className="text-3xl text-cyan-600">+</span>
											<span className="mt-2 text-sm font-semibold text-slate-700">
												Choose an image
											</span>
											<span className="mt-1 text-xs text-slate-500">PNG, JPG up to 5 MB</span>
										</div>
									)}
									<input
										accept="image/png,image/jpeg,image/webp"
										className="sr-only"
										id="post-image"
										ref={imageInputRef}
										onChange={handleImageChange}
										type="file"
									/>
								</label>

								{imageName && (
									<p className="mt-3 truncate text-xs text-slate-500">{imageName}</p>
								)}
							</section>

							<section className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
									Before you publish
								</p>
								<ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
									<li>Make the title specific and easy to understand.</li>
									<li>Use short paragraphs so the story is comfortable to read.</li>
									<li>Choose one category that best represents your idea.</li>
								</ul>
							</section>

							<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
									Live preview
								</p>
								<h2 className="mt-3 text-xl font-semibold leading-tight text-slate-950">
									{formData.title || 'Your story title will appear here'}
								</h2>
								<p className="mt-3 line-clamp-5 whitespace-pre-line text-sm leading-6 text-slate-600">
									{formData.content || 'As you write, you will see a small preview of your story here.'}
								</p>
							</section>
						</aside>
					</div>
				</form>
			</main>
		</div>
	)
}

export default WritePage
