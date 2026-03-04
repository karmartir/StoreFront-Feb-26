const Gallery = () => {

	return (
		<div className="container bg-light rounded-5 py-4 px-5">
			<h1 className="text-center mb-4">Gallery</h1>
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
				{Array(12).fill(null).map((_, index) => (
					<div key={index} className="col">
						<div className="card h-100 border-0 shadow-sm">
							<img src="/images/17.webp" className="card-img-top" alt="..." />
							<div className="card-body">
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>

	);
};

export default Gallery;
