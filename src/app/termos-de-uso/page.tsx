export default function TermosDeUsoPage() {
  return (
    <div className="py-4">
      <div className="max-w-4xl mx-auto">
        {/* Título da página */}
        <div className="mb-12 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
            </div>
            <div className="relative flex justify-center">
              <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-4xl shadow-2xl">
                <span className="mr-3">📋</span>
                Termos de Uso
                <span className="ml-3">📋</span>
              </h1>
            </div>
          </div>
          <p className="text-center text-gray-300 mt-6 text-lg">
            Última atualização: Janeiro de 2025
          </p>
        </div>

        {/* Conteúdo dos termos */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Ao acessar e utilizar o site Jogaly (jogaly.com.br), você concorda em cumprir e estar sujeito aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nosso site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Descrição do Serviço</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                O Jogaly é uma plataforma online que oferece acesso gratuito a uma coleção de jogos em diversas categorias. Nossos serviços incluem:
              </p>
              <ul className="text-gray-300 list-disc list-inside space-y-2 ml-4">
                <li>Acesso a jogos online gratuitos</li>
                <li>Navegação por categorias de jogos</li>
                <li>Sistema de curtidas e visualizações</li>
                <li>Interface responsiva para diferentes dispositivos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Uso Aceitável</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Você concorda em usar o Jogaly apenas para fins legais e de acordo com estes termos. É proibido:
              </p>
              <ul className="text-gray-300 list-disc list-inside space-y-2 ml-4">
                <li>Usar o site para qualquer propósito ilegal ou não autorizado</li>
                <li>Tentar hackear, quebrar ou comprometer a segurança do site</li>
                <li>Usar bots, scripts ou outras ferramentas automatizadas</li>
                <li>Copiar, distribuir ou modificar o conteúdo sem autorização</li>
                <li>Interferir no funcionamento normal do site</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Propriedade Intelectual</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                O conteúdo do site Jogaly, incluindo mas não limitado a textos, gráficos, logos, ícones, imagens e software, é propriedade do Jogaly ou de seus fornecedores de conteúdo e é protegido pelas leis de direitos autorais.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Os jogos disponibilizados em nossa plataforma são propriedade de seus respectivos desenvolvedores e estão sujeitos às suas próprias licenças e termos de uso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Privacidade</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Sua privacidade é importante para nós. Coletamos apenas as informações necessárias para o funcionamento do site, como dados de navegação e preferências de jogos. Não compartilhamos suas informações pessoais com terceiros sem seu consentimento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Disponibilidade do Serviço</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Embora nos esforcemos para manter o site disponível 24/7, não garantimos que o serviço será ininterrupto ou livre de erros. Podemos suspender ou interromper o serviço temporariamente para manutenção ou atualizações.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitação de Responsabilidade</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                O Jogaly é fornecido &quot;como está&quot; sem garantias de qualquer tipo. Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou incapacidade de usar nosso site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Modificações dos Termos</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. É sua responsabilidade revisar periodicamente estes termos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Lei Aplicável</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Contato</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Se você tiver dúvidas sobre estes termos de uso, entre em contato conosco através do nosso site.
              </p>
            </section>
          </div>
        </div>

        {/* Botão de voltar */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            <span className="mr-2">🏠</span>
            Voltar ao Início
          </a>
        </div>
      </div>
    </div>
  )
} 