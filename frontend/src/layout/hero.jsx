function Hero(){
    return(
        <section id="hero" className="hero section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="hero-content">

                            <h1 className="mb-4">
                                SELAMAT DATANG DI <span style={{color: "#27227d"}}>NF - </span>
                               <span style={{color: "#f59e0b"}}>SMARTFINDER </span>                            
                            </h1>

                            <p className="mb-4 mb-md-5">
                                Kami menyediakan platform untuk membantu anda melaporkan barang temuan atau
                                mencari barang yang hilang!
                            </p>

                            <div className="hero-buttons">
                                <a href="#lapor" className="btn btn-primary me-0 me-sm-2 mx-1">Buat Laporan</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="hero-image">
                        <img src="/assets/img/hero.svg" alt="Hero Image" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero