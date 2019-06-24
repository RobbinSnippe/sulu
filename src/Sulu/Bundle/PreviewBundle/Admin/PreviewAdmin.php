<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\PreviewBundle\Admin;

use Sulu\Bundle\AdminBundle\Admin\Admin;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class PreviewAdmin extends Admin
{
    /**
     * @var UrlGeneratorInterface
     */
    private $urlGenerator;

    /**
     * @var int
     */
    private $previewDelay;

    /**
     * @var string
     */
    private $previewMode;

    public function __construct(
        UrlGeneratorInterface $urlGenerator,
        int $previewDelay,
        string $previewMode
    ) {
        $this->urlGenerator = $urlGenerator;
        $this->previewDelay = $previewDelay;
        $this->previewMode = $previewMode;
    }

    public function getConfigKey(): ?string
    {
        return 'sulu_preview';
    }

    public function getConfig(): ?array
    {
        return [
            'endpoints' => [
                'start' => $this->urlGenerator->generate('sulu_preview.start'),
                'render' => $this->urlGenerator->generate('sulu_preview.render'),
                'update' => $this->urlGenerator->generate('sulu_preview.update'),
                'update-context' => $this->urlGenerator->generate('sulu_preview.update-context'),
                'stop' => $this->urlGenerator->generate('sulu_preview.stop'),
            ],
            'debounceDelay' => $this->previewDelay,
            'mode' => $this->previewMode,
        ];
    }
}
