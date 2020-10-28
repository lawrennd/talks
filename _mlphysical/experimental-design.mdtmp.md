---
abstract: 'This lecture will review the ideas behind using surrogate models for experimental
  design.

  '
author:
- family: Lawrence
  given: Neil D.
  gscholar: r3SJcvoAAAAJ
  institution: University of Cambridge
  orcid: 0000-0001-9258-1030
  twitter: lawrennd
  url: http://inverseprobability.com
date: 2020-10-29
ipynb: true
layout: lecture
notebookdir: ../../../mlatcl/mlphysical/_notebooks/
notedir: ../../../mlatcl/mlphysical/_notes/
postdir: ../../../mlatcl/mlphysical/_lectures/
potx: ../_includes/judge-exec-reference.potx
pptx: true
reveal: true
room: null
slidedir: ../../../mlatcl/mlphysical/slides/
talkscam: null
time: '10:00'
title: Emulation and Experimental Design
transition: None
venue: Virtual (Zoom)
week: 4
---
\newcommand{\tk}[1]{}
%\newcommand{\tk}[1]{\textbf{TK}: #1}
\newcommand{\Amatrix}{\mathbf{A}}
\newcommand{\KL}[2]{\text{KL}\left( #1\,\|\,#2 \right)}
\newcommand{\Kaast}{\kernelMatrix_{\mathbf{ \ast}\mathbf{ \ast}}}
\newcommand{\Kastu}{\kernelMatrix_{\mathbf{ \ast} \inducingVector}}
\newcommand{\Kff}{\kernelMatrix_{\mappingFunctionVector \mappingFunctionVector}}
\newcommand{\Kfu}{\kernelMatrix_{\mappingFunctionVector \inducingVector}}
\newcommand{\Kuast}{\kernelMatrix_{\inducingVector \bf\ast}}
\newcommand{\Kuf}{\kernelMatrix_{\inducingVector \mappingFunctionVector}}
\newcommand{\Kuu}{\kernelMatrix_{\inducingVector \inducingVector}}
\newcommand{\Kuui}{\Kuu^{-1}}
\newcommand{\Qaast}{\mathbf{Q}_{\bf \ast \ast}}
\newcommand{\Qastf}{\mathbf{Q}_{\ast \mappingFunction}}
\newcommand{\Qfast}{\mathbf{Q}_{\mappingFunctionVector \bf \ast}}
\newcommand{\Qff}{\mathbf{Q}_{\mappingFunctionVector \mappingFunctionVector}}
\newcommand{\aMatrix}{\mathbf{A}}
\newcommand{\aScalar}{a}
\newcommand{\aVector}{\mathbf{a}}
\newcommand{\acceleration}{a}
\newcommand{\bMatrix}{\mathbf{B}}
\newcommand{\bScalar}{b}
\newcommand{\bVector}{\mathbf{b}}
\newcommand{\basisFunc}{\phi}
\newcommand{\basisFuncVector}{\boldsymbol{ \basisFunc}}
\newcommand{\basisFunction}{\phi}
\newcommand{\basisLocation}{\mu}
\newcommand{\basisMatrix}{\boldsymbol{ \Phi}}
\newcommand{\basisScalar}{\basisFunction}
\newcommand{\basisVector}{\boldsymbol{ \basisFunction}}
\newcommand{\activationFunction}{\phi}
\newcommand{\activationMatrix}{\boldsymbol{ \Phi}}
\newcommand{\activationScalar}{\basisFunction}
\newcommand{\activationVector}{\boldsymbol{ \basisFunction}}
\newcommand{\bigO}{\mathcal{O}}
\newcommand{\binomProb}{\pi}
\newcommand{\cMatrix}{\mathbf{C}}
\newcommand{\cbasisMatrix}{\hat{\boldsymbol{ \Phi}}}
\newcommand{\cdataMatrix}{\hat{\dataMatrix}}
\newcommand{\cdataScalar}{\hat{\dataScalar}}
\newcommand{\cdataVector}{\hat{\dataVector}}
\newcommand{\centeredKernelMatrix}{\mathbf{ \MakeUppercase{\centeredKernelScalar}}}
\newcommand{\centeredKernelScalar}{b}
\newcommand{\centeredKernelVector}{\centeredKernelScalar}
\newcommand{\centeringMatrix}{\mathbf{H}}
\newcommand{\chiSquaredDist}[2]{\chi_{#1}^{2}\left(#2\right)}
\newcommand{\chiSquaredSamp}[1]{\chi_{#1}^{2}}
\newcommand{\conditionalCovariance}{\boldsymbol{ \Sigma}}
\newcommand{\coregionalizationMatrix}{\mathbf{B}}
\newcommand{\coregionalizationScalar}{b}
\newcommand{\coregionalizationVector}{\mathbf{ \coregionalizationScalar}}
\newcommand{\covDist}[2]{\text{cov}_{#2}\left(#1\right)}
\newcommand{\covSamp}[1]{\text{cov}\left(#1\right)}
\newcommand{\covarianceScalar}{c}
\newcommand{\covarianceVector}{\mathbf{ \covarianceScalar}}
\newcommand{\covarianceMatrix}{\mathbf{C}}
\newcommand{\covarianceMatrixTwo}{\boldsymbol{ \Sigma}}
\newcommand{\croupierScalar}{s}
\newcommand{\croupierVector}{\mathbf{ \croupierScalar}}
\newcommand{\croupierMatrix}{\mathbf{ \MakeUppercase{\croupierScalar}}}
\newcommand{\dataDim}{p}
\newcommand{\dataIndex}{i}
\newcommand{\dataIndexTwo}{j}
\newcommand{\dataMatrix}{\mathbf{Y}}
\newcommand{\dataScalar}{y}
\newcommand{\dataSet}{\mathcal{D}}
\newcommand{\dataStd}{\sigma}
\newcommand{\dataVector}{\mathbf{ \dataScalar}}
\newcommand{\decayRate}{d}
\newcommand{\degreeMatrix}{\mathbf{ \MakeUppercase{\degreeScalar}}}
\newcommand{\degreeScalar}{d}
\newcommand{\degreeVector}{\mathbf{ \degreeScalar}}
% Already defined by latex
%\newcommand{\det}[1]{\left|#1\right|}
\newcommand{\diag}[1]{\text{diag}\left(#1\right)}
\newcommand{\diagonalMatrix}{\mathbf{D}}
\newcommand{\diff}[2]{\frac{\text{d}#1}{\text{d}#2}}
\newcommand{\diffTwo}[2]{\frac{\text{d}^2#1}{\text{d}#2^2}}
\newcommand{\displacement}{x}
\newcommand{\displacementVector}{\textbf{\displacement}}
\newcommand{\distanceMatrix}{\mathbf{ \MakeUppercase{\distanceScalar}}}
\newcommand{\distanceScalar}{d}
\newcommand{\distanceVector}{\mathbf{ \distanceScalar}}
\newcommand{\eigenvaltwo}{\ell}
\newcommand{\eigenvaltwoMatrix}{\mathbf{L}}
\newcommand{\eigenvaltwoVector}{\mathbf{l}}
\newcommand{\eigenvalue}{\lambda}
\newcommand{\eigenvalueMatrix}{\boldsymbol{ \Lambda}}
\newcommand{\eigenvalueVector}{\boldsymbol{ \lambda}}
\newcommand{\eigenvector}{\mathbf{ \eigenvectorScalar}}
\newcommand{\eigenvectorMatrix}{\mathbf{U}}
\newcommand{\eigenvectorScalar}{u}
\newcommand{\eigenvectwo}{\mathbf{v}}
\newcommand{\eigenvectwoMatrix}{\mathbf{V}}
\newcommand{\eigenvectwoScalar}{v}
\newcommand{\entropy}[1]{\mathcal{H}\left(#1\right)}
\newcommand{\errorFunction}{E}
\newcommand{\expDist}[2]{\left<#1\right>_{#2}}
\newcommand{\expSamp}[1]{\left<#1\right>}
\newcommand{\expectation}[1]{\left\langle #1 \right\rangle }
\newcommand{\expectationDist}[2]{\left\langle #1 \right\rangle _{#2}}
\newcommand{\expectedDistanceMatrix}{\mathcal{D}}
\newcommand{\eye}{\mathbf{I}}
\newcommand{\fantasyDim}{r}
\newcommand{\fantasyMatrix}{\mathbf{ \MakeUppercase{\fantasyScalar}}}
\newcommand{\fantasyScalar}{z}
\newcommand{\fantasyVector}{\mathbf{ \fantasyScalar}}
\newcommand{\featureStd}{\varsigma}
\newcommand{\gammaCdf}[3]{\mathcal{GAMMA CDF}\left(#1|#2,#3\right)}
\newcommand{\gammaDist}[3]{\mathcal{G}\left(#1|#2,#3\right)}
\newcommand{\gammaSamp}[2]{\mathcal{G}\left(#1,#2\right)}
\newcommand{\gaussianDist}[3]{\mathcal{N}\left(#1|#2,#3\right)}
\newcommand{\gaussianSamp}[2]{\mathcal{N}\left(#1,#2\right)}
\newcommand{\given}{|}
\newcommand{\half}{\frac{1}{2}}
\newcommand{\heaviside}{H}
\newcommand{\hiddenMatrix}{\mathbf{ \MakeUppercase{\hiddenScalar}}}
\newcommand{\hiddenScalar}{h}
\newcommand{\hiddenVector}{\mathbf{ \hiddenScalar}}
\newcommand{\identityMatrix}{\eye}
\newcommand{\inducingInputScalar}{z}
\newcommand{\inducingInputVector}{\mathbf{ \inducingInputScalar}}
\newcommand{\inducingInputMatrix}{\mathbf{Z}}
\newcommand{\inducingScalar}{u}
\newcommand{\inducingVector}{\mathbf{ \inducingScalar}}
\newcommand{\inducingMatrix}{\mathbf{U}}
\newcommand{\inlineDiff}[2]{\text{d}#1/\text{d}#2}
\newcommand{\inputDim}{q}
\newcommand{\inputMatrix}{\mathbf{X}}
\newcommand{\inputScalar}{x}
\newcommand{\inputSpace}{\mathcal{X}}
\newcommand{\inputVals}{\inputVector}
\newcommand{\inputVector}{\mathbf{ \inputScalar}}
\newcommand{\iterNum}{k}
\newcommand{\kernel}{\kernelScalar}
\newcommand{\kernelMatrix}{\mathbf{K}}
\newcommand{\kernelScalar}{k}
\newcommand{\kernelVector}{\mathbf{ \kernelScalar}}
\newcommand{\kff}{\kernelScalar_{\mappingFunction \mappingFunction}}
\newcommand{\kfu}{\kernelVector_{\mappingFunction \inducingScalar}}
\newcommand{\kuf}{\kernelVector_{\inducingScalar \mappingFunction}}
\newcommand{\kuu}{\kernelVector_{\inducingScalar \inducingScalar}}
\newcommand{\lagrangeMultiplier}{\lambda}
\newcommand{\lagrangeMultiplierMatrix}{\boldsymbol{ \Lambda}}
\newcommand{\lagrangian}{L}
\newcommand{\laplacianFactor}{\mathbf{ \MakeUppercase{\laplacianFactorScalar}}}
\newcommand{\laplacianFactorScalar}{m}
\newcommand{\laplacianFactorVector}{\mathbf{ \laplacianFactorScalar}}
\newcommand{\laplacianMatrix}{\mathbf{L}}
\newcommand{\laplacianScalar}{\ell}
\newcommand{\laplacianVector}{\mathbf{ \ell}}
\newcommand{\latentDim}{q}
\newcommand{\latentDistanceMatrix}{\boldsymbol{ \Delta}}
\newcommand{\latentDistanceScalar}{\delta}
\newcommand{\latentDistanceVector}{\boldsymbol{ \delta}}
\newcommand{\latentForce}{f}
\newcommand{\latentFunction}{u}
\newcommand{\latentFunctionVector}{\mathbf{ \latentFunction}}
\newcommand{\latentFunctionMatrix}{\mathbf{ \MakeUppercase{\latentFunction}}}
\newcommand{\latentIndex}{j}
\newcommand{\latentScalar}{z}
\newcommand{\latentVector}{\mathbf{ \latentScalar}}
\newcommand{\latentMatrix}{\mathbf{Z}}
\newcommand{\learnRate}{\eta}
\newcommand{\lengthScale}{\ell}
\newcommand{\rbfWidth}{\ell}
\newcommand{\likelihoodBound}{\mathcal{L}}
\newcommand{\likelihoodFunction}{L}
\newcommand{\locationScalar}{\mu}
\newcommand{\locationVector}{\boldsymbol{ \locationScalar}}
\newcommand{\locationMatrix}{\mathbf{M}}
\newcommand{\variance}[1]{\text{var}\left( #1 \right)}
\newcommand{\mappingFunction}{f}
\newcommand{\mappingFunctionMatrix}{\mathbf{F}}
\newcommand{\mappingFunctionTwo}{g}
\newcommand{\mappingFunctionTwoMatrix}{\mathbf{G}}
\newcommand{\mappingFunctionTwoVector}{\mathbf{ \mappingFunctionTwo}}
\newcommand{\mappingFunctionVector}{\mathbf{ \mappingFunction}}
\newcommand{\scaleScalar}{s}
\newcommand{\mappingScalar}{w}
\newcommand{\mappingVector}{\mathbf{ \mappingScalar}}
\newcommand{\mappingMatrix}{\mathbf{W}}
\newcommand{\mappingScalarTwo}{v}
\newcommand{\mappingVectorTwo}{\mathbf{ \mappingScalarTwo}}
\newcommand{\mappingMatrixTwo}{\mathbf{V}}
\newcommand{\maxIters}{K}
\newcommand{\meanMatrix}{\mathbf{M}}
\newcommand{\meanScalar}{\mu}
\newcommand{\meanTwoMatrix}{\mathbf{M}}
\newcommand{\meanTwoScalar}{m}
\newcommand{\meanTwoVector}{\mathbf{ \meanTwoScalar}}
\newcommand{\meanVector}{\boldsymbol{ \meanScalar}}
\newcommand{\mrnaConcentration}{m}
\newcommand{\naturalFrequency}{\omega}
\newcommand{\neighborhood}[1]{\mathcal{N}\left( #1 \right)}
\newcommand{\neilurl}{http://inverseprobability.com/}
\newcommand{\noiseMatrix}{\boldsymbol{ E}}
\newcommand{\noiseScalar}{\epsilon}
\newcommand{\noiseVector}{\boldsymbol{ \epsilon}}
\newcommand{\norm}[1]{\left\Vert #1 \right\Vert}
\newcommand{\normalizedLaplacianMatrix}{\hat{\mathbf{L}}}
\newcommand{\normalizedLaplacianScalar}{\hat{\ell}}
\newcommand{\normalizedLaplacianVector}{\hat{\mathbf{ \ell}}}
\newcommand{\numActive}{m}
\newcommand{\numBasisFunc}{m}
\newcommand{\numComponents}{m}
\newcommand{\numComps}{K}
\newcommand{\numData}{n}
\newcommand{\numFeatures}{K}
\newcommand{\numHidden}{h}
\newcommand{\numInducing}{m}
\newcommand{\numLayers}{\ell}
\newcommand{\numNeighbors}{K}
\newcommand{\numSequences}{s}
\newcommand{\numSuccess}{s}
\newcommand{\numTasks}{m}
\newcommand{\numTime}{T}
\newcommand{\numTrials}{S}
\newcommand{\outputIndex}{j}
\newcommand{\paramVector}{\boldsymbol{ \theta}}
\newcommand{\parameterMatrix}{\boldsymbol{ \Theta}}
\newcommand{\parameterScalar}{\theta}
\newcommand{\parameterVector}{\boldsymbol{ \parameterScalar}}
\newcommand{\partDiff}[2]{\frac{\partial#1}{\partial#2}}
\newcommand{\precisionScalar}{j}
\newcommand{\precisionVector}{\mathbf{ \precisionScalar}}
\newcommand{\precisionMatrix}{\mathbf{J}}
\newcommand{\pseudotargetScalar}{\widetilde{y}}
\newcommand{\pseudotargetVector}{\mathbf{ \pseudotargetScalar}}
\newcommand{\pseudotargetMatrix}{\mathbf{ \widetilde{Y}}}
\newcommand{\rank}[1]{\text{rank}\left(#1\right)}
\newcommand{\rayleighDist}[2]{\mathcal{R}\left(#1|#2\right)}
\newcommand{\rayleighSamp}[1]{\mathcal{R}\left(#1\right)}
\newcommand{\responsibility}{r}
\newcommand{\rotationScalar}{r}
\newcommand{\rotationVector}{\mathbf{ \rotationScalar}}
\newcommand{\rotationMatrix}{\mathbf{R}}
\newcommand{\sampleCovScalar}{s}
\newcommand{\sampleCovVector}{\mathbf{ \sampleCovScalar}}
\newcommand{\sampleCovMatrix}{\mathbf{s}}
\newcommand{\scalarProduct}[2]{\left\langle{#1},{#2}\right\rangle}
\newcommand{\sign}[1]{\text{sign}\left(#1\right)}
\newcommand{\sigmoid}[1]{\sigma\left(#1\right)}
\newcommand{\singularvalue}{\ell}
\newcommand{\singularvalueMatrix}{\mathbf{L}}
\newcommand{\singularvalueVector}{\mathbf{l}}
\newcommand{\sorth}{\mathbf{u}}
\newcommand{\spar}{\lambda}
\newcommand{\trace}[1]{\text{tr}\left(#1\right)}
\newcommand{\BasalRate}{B}
\newcommand{\DampingCoefficient}{C}
\newcommand{\DecayRate}{D}
\newcommand{\Displacement}{X}
\newcommand{\LatentForce}{F}
\newcommand{\Mass}{M}
\newcommand{\Sensitivity}{S}
\newcommand{\basalRate}{b}
\newcommand{\dampingCoefficient}{c}
\newcommand{\mass}{m}
\newcommand{\sensitivity}{s}
\newcommand{\springScalar}{\kappa}
\newcommand{\springVector}{\boldsymbol{ \kappa}}
\newcommand{\springMatrix}{\boldsymbol{ \mathcal{K}}}
\newcommand{\tfConcentration}{p}
\newcommand{\tfDecayRate}{\delta}
\newcommand{\tfMrnaConcentration}{f}
\newcommand{\tfVector}{\mathbf{ \tfConcentration}}
\newcommand{\velocity}{v}
\newcommand{\sufficientStatsScalar}{g}
\newcommand{\sufficientStatsVector}{\mathbf{ \sufficientStatsScalar}}
\newcommand{\sufficientStatsMatrix}{\mathbf{G}}
\newcommand{\switchScalar}{s}
\newcommand{\switchVector}{\mathbf{ \switchScalar}}
\newcommand{\switchMatrix}{\mathbf{S}}
\newcommand{\tr}[1]{\text{tr}\left(#1\right)}
\newcommand{\loneNorm}[1]{\left\Vert #1 \right\Vert_1}
\newcommand{\ltwoNorm}[1]{\left\Vert #1 \right\Vert_2}
\newcommand{\onenorm}[1]{\left\vert#1\right\vert_1}
\newcommand{\twonorm}[1]{\left\Vert #1 \right\Vert}
\newcommand{\vScalar}{v}
\newcommand{\vVector}{\mathbf{v}}
\newcommand{\vMatrix}{\mathbf{V}}
\newcommand{\varianceDist}[2]{\text{var}_{#2}\left( #1 \right)}
% Already defined by latex
%\newcommand{\vec}{#1:}
\newcommand{\vecb}[1]{\left(#1\right):}
\newcommand{\weightScalar}{w}
\newcommand{\weightVector}{\mathbf{ \weightScalar}}
\newcommand{\weightMatrix}{\mathbf{W}}
\newcommand{\weightedAdjacencyMatrix}{\mathbf{A}}
\newcommand{\weightedAdjacencyScalar}{a}
\newcommand{\weightedAdjacencyVector}{\mathbf{ \weightedAdjacencyScalar}}
\newcommand{\onesVector}{\mathbf{1}}
\newcommand{\zerosVector}{\mathbf{0}}

\include{talk-macros.tex}

\section{Emulation}

\include{_uq/includes/emulation.md}
\include{_supply-chain/includes/experiment-analyze-design.md}
\section{Emukit Playground}

\include{_uq/includes/emukit-playground.md}

\include{_gp/includes/gpy-software.md}

\downloadcode{mlai}
\downloadcode{teaching_plots}
\downloadcode{gp_tutorial}

\installcode{GPy}
\installcode{pyDOE}
\installcode{EmuKit}

\setupcode{import mlai
import teaching_plots as plot}

Related publications and links will appear here.

Examle paper: @McKay-selecting79 @Kennedy-bayesian01

The MUCM project <http://www.mucm.ac.uk/>

$\newcommand{\dataStd}{\sigma_{\text{noise}}}$

http://www.mucm.ac.uk/Pages/Dissemination/TechnicalReports.html

> Random Sampling. Let the input values $x_1, \dots, x_\numData$
> be a random sample from $f(x)$. This method of sampling is perhaps the most obvious, and an entire body
> of statistical literature may be used in making infer-
> ences regarding the distribution of $Y(t)$.
> Stratified Sampling. Using stratified sampling, all
> areas of the sample space of $X$ are represented by
> input values. Let the sample space $S$ of $X$ be partitioned into $I$ disjoint strata $S_t$. Let $\pi = P(X C S_i)$
> represent the size of $S_i$. Obtain a random sample $XiJ,j
> = 1, \dots, n$ from $S_i$. Then of course the $n_i$ sum to $N$.
> If $I = 1$, we have random sampling over the entire
> sample space.
> Latin Hypercube Sampling. The same reasoning
> that led to stratified sampling, ensuring that all por-
> tions of $S$ were sampled, could lead further. If we
> wish to ensure also that each of the input variables $X_k$
> has all portions of its distribution represented by
> input values, we can divide the range of each $X_k$ into
> $N$ strata of equal marginal probability $1/N$, and
> sample once from each stratum. Let this sample be
> $Xkj,j = 1, \dots, N$. These form the $X_k$ component, $k =
> 1, * , K, in Xi, i = 1, * , N$. The components of the
> various $X,A's$ are matched at random. This method of
> selecting input values is an extension of quota sam-
> pling [13], and can be viewed as a K-dimensional
> extension of Latin square sampling [11].
> One advantage of the Latin hypercube sample ap-
> pears when the output $Y(t)$ is dominated by only a
> few of the components of $X$. This method ensures
> that each of those components is represented in a
> fully stratified manner, no matter which components
> might turn out to be important.
> We mention here that the $N$ intervals on the range
> of each component of X combine to form $NK$ cells
> which cover the sample space of $X$. These cells, which
> are labeled by coordinates corresponding to the inter-
> vals, are used when finding the properties of the
> sampling plan.

This introduction is based on [An Introduction to Experimental Design with Emukit](https://github.com/EmuKit/emukit/blob/master/notebooks/Emukit-tutorial-experimental-design-introduction.ipynb) written by Andrei Paleyes and Maren Mahsereci.

\include{_uq/includes/alex-forrester.md}

Experimental design.

Latin hypercube

Linear example

\setupcode{import numpy as np

from emukit.test_functions import forrester_function
from emukit.core.loop.user_function import UserFunctionWrapper
from emukit.core import ContinuousParameter, ParameterSpace}


\code{target_function, space = forrester_function()}

\code{x_plot = np.linspace(space.parameters[0].min, space.parameters[0].max, 301)[:, None]
y_plot = target_function(x_plot)}

\setupplot{import matplotlib.pyplot as plt}

\plotcode{fig, ax = plt.subplots(figsize=plot.big_wide_figsize)
ax.plot(x_plot, y_plot, 'k', label='target Function')

ax.legend(loc=2)
ax.set_xlabel('$x$')
ax.set_ylabel('$f(x)$')
ax.grid(True)
ax.set_xlim(0, 1)

mlai.write_figure(filename='forrester-function.svg', directory='\writeDiagramsDir/uq')}

\figure{\includediagram{\diagramsDir/uq/forrester-function}{80%}}{The Forrester function [@Forrester-engineering08].}{forrester-function}

\subsection{Initial Design}

\notes{Usually, before we start the actual ExpDesign loop we need to gather a few observations such that we can fit the model. This is called the initial design and common strategies are either a predefined grid or sampling points uniformly at random.}

\code{X_init = np.array([[0.2],[0.6], [0.9]])
Y_init = target_function(X_init)}

\plotcode{fig, ax = plt.subplots(figsize=plot.big_wide_figsize)
ax.plot(X_init, Y_init, 'ro', markersize=10, label='Observations')
ax.plot(x_plot, y_plot, 'k', label='Target Function')

ax.legend(loc=2)
ax.set_xlabel('$x$')
ax.set_ylabel('$f(x)$')
ax.grid(True)
ax.set_xlim(0, 1)

mlai.write_figure(filename='forrester-function-initial-design.svg', directory='\writeDiagramsDir/uq')}

\figure{\includediagram{\diagramsDir/uq/forrester-function-initial-design}{80%}}{The initial design for the Forrester function example.}{forrester-function-initial-design}

\subsection{The Model}

\notes{Now we can start with the ExpDesign loop by first fitting a model on the collected data. 
A popular model for ExpDesign is a Gaussian process (GP) which defines a probability distribution across classes of functions, typically smooth, such that each linear finite-dimensional restriction is multivariate Gaussian [@Rasmussen:book06]. Gaussian processes are fully parametrized by a mean $\mu(\inputVector)$ and a covariance function $\kernelScalar(\inputVector,\inputVector^\prime)$.  Without loss of generality $\mu(\inputVector)$ is assumed to be zero. The covariance function $\kernelScalar(\inputVector,\inputVector^\prime)$ characterizes the smoothness and other properties of $\mappingFunction$. It is known that the kernel of the process has to be continuous, symmetric and positive definite. A widely used kernel is the exponentiated quadratic or RBF kernel: 
$$ 
\kernelScalar(\inputVector,\inputVector^\prime) = \alpha \exp{ \left(-\frac{\|\inputVector-\inputVector^\prime\|^2}{2 \ell}\right)} 
$$ 
where $\alpha$ and $\ell$ are hyperparameters.

To denote that $\mappingFunction$ is a sample from a GP with mean $\mu$ and covariance $k$ we write
$$
\mappingFunction \sim \mathcal{GP}(\mu,k).
$$ 

For regression tasks, the most important feature of GPs is that process priors are conjugate to the likelihood from finitely many observations $\dataMatrix = (y_1,\dots,y_\numData)^\top$ and $\inputMatrix =\{\inputVector_1,\dots,\inputVector_\numData\}$, $\inputVector_i\in \mathcal{X}$ of the form $\dataScalar_i = \mappingFunction(\inputVector_i) + \noiseScalar_i$ where $\noiseScalar_i \sim \gaussianSamp{0}{\dataStd^2}$ and we typically estimate $\dataStd^2$ by maximum likelihood alongside $\alpha$ and $\ell$.

We obtain the Gaussian posterior 
$$
\mappingFunction(\inputVector^*)|\inputMatrix, \dataMatrix, \theta \sim \gaussianSamp{\mu(\inputVector^*)}{\sigma^2(\inputVector^*)},
$$
where $\mu(\inputVector^*)$ and $\sigma^2(\inputVector^*)$ have a closed form solution as we've seen in the earlier lectures (see also @Rasmussen:book06).}

\notes{Note that Gaussian processes are also characterized by hyperparameters, for example in the exponatiated quadratic case we have $\paramVector = \left\{ \alpha, \ell, \dataStd^2 \right\}$ for the scale of the covariance, the lengthscale and the noise variance. Here, for simplicitly we will keep these hyperparameters fixed. However, we will usually either optimize or sample these hyperparameters using the marginal loglikelihood of the GP. 

In this module we've focussed on Gaussian processes, but we could also use any other model that returns a mean $\mu(\inputVector)$ and variance $\sigma^2(\inputVector)$ on an arbitrary input points $\inputVector$ such as Bayesian neural networks or random forests. In Emukit these different models can be used by defining a new `ModelWrapper`.}

\setupcode{import GPy
from emukit.model_wrappers.gpy_model_wrappers import GPyModelWrapper}

\code{kern = GPy.kern.RBF(1, lengthscale=0.08, variance=20)
gpy_model = GPy.models.GPRegression(X_init, Y_init, kern, noise_var=1e-10)
emukit_model = GPyModelWrapper(gpy_model)

mu_plot, var_plot = emukit_model.predict(x_plot)}

\setupplotcode{import matplotlib.pyplot as plt

from matplotlib import colors as mcolors
from matplotlib import cm

colors = dict(mcolors.BASE_COLORS, **mcolors.CSS4_COLORS)}

\plotcode{fig, ax = plt.subplots(figsize=plot.big_wide_figsize)
ax.plot(X_init, Y_init, 'ro', markersize=10, label='Observations')
ax.plot(x_plot, y_plot, 'k', label='Objective Function')
ax.plot(x_plot, mu_plot, 'C0', label='Model')
ax.fill_between(x_plot[:, 0],
                 mu_plot[:, 0] + np.sqrt(var_plot)[:, 0],
                 mu_plot[:, 0] - np.sqrt(var_plot)[:, 0], color='C0', alpha=0.6)
ax.fill_between(x_plot[:, 0],
                 mu_plot[:, 0] + 2 * np.sqrt(var_plot)[:, 0],
                 mu_plot[:, 0] - 2 * np.sqrt(var_plot)[:, 0], color='C0', alpha=0.4)
ax.fill_between(x_plot[:, 0],
                 mu_plot[:, 0] + 3 * np.sqrt(var_plot)[:, 0],
                 mu_plot[:, 0] - 3 * np.sqrt(var_plot)[:, 0], color='C0', alpha=0.2)
ax.legend(loc=2)
ax.set_xlabel('$x$')
ax.set_ylabel('$f(x)$')
ax.grid(True)
ax.set_xlim(0, 1)

mlai.write_figure(filename='forrester-function-entropy.svg', directory='\writeDiagramsDir/uq')}

\figure{\includediagram{\diagramsDir/uq/forrester-function-entropy}{80%}}{The emulator fitted to the Forrester function with only three observations. The error bars show 1, 2 and 3 standard deviations.}{forrester-function-entropy}

\subsection{The Acquisition Function}

\notes{In the second step of our ExpDesign loop we use our model to compute the acquisition function. We'll review two different forms of acquisition funciton for doing this.}

\subsubsection{Uncertainty Sampling}

\notes{In uncertainty sampling (US) we hoose the next value $\inputVector_{n+1}$ at the location where the model on $\mappingFunction(\inputVector)$ has the highest marginal predictive variance}
$$
a_{US}(\inputVector) = \sigma^2(\inputVector).
$$ 
\notes{This makes sure, that we learn the function $\mappingFunction(\cdot)$ everywhere on $\mathbb{X}$ to a similar level of absolute error.}

\subsubsection{Integrated Variance Reduction}

\notes{In the integrated variance reduction (IVR) you choose the next value $\inputVector_{n+1}$ such that the total variance of the model is reduced maximally [@Sacks-design89],}
$$
a_{IVR} = \int_{\mathbb{X}}[\sigma^2(\inputVector') - \sigma^2(\inputVector'; \inputVector)]\text{d}\inputVector'\approx 
\frac{1}{\# \text{samples}}\sum_i^{\# \text{samples}}[\sigma^2(\inputVector_i) - \sigma^2(\inputVector_i; \inputVector)].
$$
\notes{Here $\sigma^2(\inputVector'; \inputVector)$ is the predictive variance at $\inputVector'$ had $\inputVector$ been observed. Thus IVR computes the overall reduction in variance (for all points in $\mathbb{X}$) had $f$ been observed at $\inputVector$.

The finite sum approximation on the right hand side of the equation is usually used because the integral over $\inputVector'$ is not analytic. In that case $\inputVector_i$ are sampled randomly. For a GP model the right hand side simplifies to}
$$
a_{LCB} \approx \frac{1}{\# \text{samples}}\sum_i^{\# \text{samples}}\frac{\kernelScalar^2(\inputVector_i, \inputVector)}{\sigma^2(\inputVector)}.
$$

\notes{IVR is arguably the more principled approach, but often US is preferred over IVR simply because it lends itself to gradient based optimization more easily, is cheaper to compute, and is exact. 

For both of them (stochastic) gradient base optimizers are used to retrieve $\inputVector_{n+1} \in \operatorname*{arg\:max}_{\inputVector \in \mathbb{X}} a(\inputVector)$.}

\setupcode{from emukit.experimental_design.acquisitions import IntegratedVarianceReduction, ModelVariance}

\code{us_acquisition = ModelVariance(emukit_model)
ivr_acquisition = IntegratedVarianceReduction(emukit_model, space)

us_plot = us_acquisition.evaluate(x_plot)
ivr_plot = ivr_acquisition.evaluate(x_plot)}

\plotcode{fig, ax = plt.subplots(figsize=plot.big_wide_figsize)
ax.plot(x_plot, us_plot / np.max(us_plot), 'green', label='US')
ax.plot(x_plot, ivr_plot / np.max(ivr_plot) , 'purple', label='IVR')

ax.legend(loc=1)
ax.set_xlabel('$x$')
ax.set_ylabel('$f(x)$')
ax.grid(True)
ax.set_xlim(-0.01, 1)

mlai.write_figure('experimental-design-acquisition-functions-forrester.svg', directory='\writeDiagramsDir/uq')}

\figure{\includediagram{\diagramsDir/uq/experimental-design-acquisition-functions-forrester}{80%}}{The *uncertainty sampling* and *integrated variance reduction* acquisition functions for the Forrester example.}{experimental-design-acquisition-functions}

\subsection{ Evaluating the objective function}

\notes{To find the next point to evaluate we optimize the acquisition function using a standard gradient descent optimizer.}

\setupcode{from emukit.core.optimization import GradientAcquisitionOptimizer}

\code{optimizer = GradientAcquisitionOptimizer(space)
x_new, _ = optimizer.optimize(us_acquisition)}

\plotcode{fig, ax = plt.subplots(figsize=plot.big_wide_figsize)
ax.plot(x_plot, us_plot / np.max(us_plot), 'green', label='US')
ax.axvline(x_new, color='red', label='x_next', linestyle='--')
ax.legend(loc=1)
ax.set_xlabel('$x$')
ax.set_ylabel('$f(x)$')
ax.grid(True)
ax.set_xlim(-0.01, 1)

mlai.write_figure('experimental-design-acquisition-next-point-forrester.svg', directory='\writeDiagramsDir/uq')}

\figure{\includediagram{\diagramsDir/uq/experimental-design-acquisition-next-point-forrester}{80%}}{The maxima of the acquisition function is found and this point is selected for inclusion.}{experimental-design-acquisition-functions}

\notes{Afterwards we evaluate the true objective function and append it to our initial observations.}

\code{y_new = target_function(x_new)}

\code{X = np.append(X_init, x_new, axis=0)
Y = np.append(Y_init, y_new, axis=0)}

\notes{After updating the model, you can see that the uncertainty about the true objective function in this region decreases and our model becomes more certain.}

\code{emukit_model.set_data(X, Y)
mu_plot, var_plot = emukit_model.predict(x_plot)}

\plotcode{fig, ax = plt.subplots(figsize=plot.big_wide_figsize)
ax.plot(emukit_model.X, emukit_model.Y, 'ro', markersize=10, label='Observations')
ax.plot(x_plot, y_plot, 'k', label='Target Function')
ax.plot(x_plot, mu_plot, 'C0', label='Model')
ax.fill_between(x_plot[:, 0],
                 mu_plot[:, 0] + np.sqrt(var_plot)[:, 0],
                 mu_plot[:, 0] - np.sqrt(var_plot)[:, 0], color='C0', alpha=0.6)
ax.fill_between(x_plot[:, 0],
                 mu_plot[:, 0] + 2 * np.sqrt(var_plot)[:, 0],
                 mu_plot[:, 0] - 2 * np.sqrt(var_plot)[:, 0], color='C0', alpha=0.4)
ax.fill_between(x_plot[:, 0],
                 mu_plot[:, 0] + 3 * np.sqrt(var_plot)[:, 0],
                 mu_plot[:, 0] - 3 * np.sqrt(var_plot)[:, 0], color='C0', alpha=0.2)
ax.legend(loc=2)
ax.set_xlabel('$x$')
ax.set_ylabel('$f(x)$')
ax.grid(True)
ax.set_xlim(-0.01, 1)

mlai.write_figure(filename='forrester-function-multi-errorbars.svg', directory='\writeDiagramsDir/uq')}

\figure{\includediagram{\diagramsDir/uq/forrester-function-multi-errorbars}{80%}}{The target Forrester function plotted alongside the emulation model and error bars from the emulation at 1, 2 and 3 standard deviations.}{forrester-function-multi-errorbars}

Entropy of posterior

\subsection{Emukit's experimental design interface}

\notes{Of course in practice we don't want to implement all of these steps our self. Emukit provides a convenient and flexible interface to apply experimental design. Below we can see how to run experimental design on the exact same function for 10 iterations.}

\setupcode{from emukit.experimental_design.experimental_design_loop import ExperimentalDesignLoop}

\code{ed = ExperimentalDesignLoop(space=space, model=emukit_model)

ed.run_loop(target_function, 10)}

\code{mu_plot, var_plot = ed.model.predict(x_plot)}

\plotcode{fig, ax = plt.subplots(figsize=plot.big_wide_figsize)
ax.plot(ed.loop_state.X, ed.loop_state.Y, 'ro', markersize=10, label='Observations')
ax.plot(x_plot, y_plot, 'k', label='Objective Function')
ax.plot(x_plot, mu_plot, 'C0', label='Model')
ax.fill_between(x_plot[:, 0],
                 mu_plot[:, 0] + np.sqrt(var_plot)[:, 0],
                 mu_plot[:, 0] - np.sqrt(var_plot)[:, 0], 
				 color='C0', alpha=0.6)

ax.fill_between(x_plot[:, 0],
                 mu_plot[:, 0] + 2 * np.sqrt(var_plot)[:, 0],
                 mu_plot[:, 0] - 2 * np.sqrt(var_plot)[:, 0], 
				 color='C0', alpha=0.4)

ax.fill_between(x_plot[:, 0],
                 mu_plot[:, 0] + 3 * np.sqrt(var_plot)[:, 0],
                 mu_plot[:, 0] - 3 * np.sqrt(var_plot)[:, 0], 
				 color='C0', alpha=0.2)
ax.legend(loc=2)
ax.set_xlabel('$x$')
ax.set_ylabel('$f(x)$')
ax.grid(True)
ax.set_xlim(0, 1)

mlai.write_figure(filename='forrester-function-full-fit.svg', directory='\writeDiagramsDir/uq')}

\figure{\includediagram{\diagramsDir/uq/forrester-function-full-fit}{80%}}{The fit of the model to the Forrester function.}{forrester-function-full-fit}


\thanks

\reading

\references
