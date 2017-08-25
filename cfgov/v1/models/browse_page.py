from django.db import models
from wagtail.wagtailadmin.edit_handlers import (
    FieldPanel,
    ObjectList,
    StreamFieldPanel,
    TabbedInterface
)
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore.models import PageManager
from wagtail.wagtailcore import blocks

from data_research.blocks import ConferenceRegistrationForm
from jobmanager.models import JobListingTable

from .. import blocks as v1_blocks
from ..atomic_elements import molecules, organisms
from ..util.util import get_secondary_nav_items
from .base import CFGOVPage


class BrowsePage(CFGOVPage):
    header = StreamField([
        ('text_introduction', molecules.TextIntroduction()),
        ('featured_content', molecules.FeaturedContent()),
    ], blank=True)

    content = StreamField([
        ('bureau_structure', organisms.BureauStructure()),
        ('info_unit_group', organisms.InfoUnitGroup()),
        ('image_text_25_75_group', organisms.ImageText2575Group()),
        ('image_text_50_50_group', organisms.ImageText5050Group()),
        ('half_width_link_blob_group', organisms.HalfWidthLinkBlobGroup()),
        ('third_width_link_blob_group', organisms.ThirdWidthLinkBlobGroup()),
        ('well', organisms.Well()),
        ('full_width_text', organisms.FullWidthText()),
        ('expandable', organisms.Expandable()),
        ('expandable_group', organisms.ExpandableGroup()),
        ('table', organisms.Table(editable=False)),
        ('table_block', organisms.AtomicTableBlock(
            table_options={'renderer': 'html'})),
        ('job_listing_table', JobListingTable()),
        ('feedback', v1_blocks.Feedback()),
        ('conference_registration_form', ConferenceRegistrationForm()),
        ('raw_html_block', blocks.RawHTMLBlock(
            label='Raw HTML block')),
        ('html_block', organisms.HTMLBlock()),
        ('chart_block', organisms.ChartBlock()),
        ('mortgage_chart_block', organisms.MortgageChartBlock()),
        ('snippet_list', organisms.SnippetList()),
        ('data_snapshot', organisms.DataSnapshot()),
    ], blank=True)

    secondary_nav_exclude_sibling_pages = models.BooleanField(default=False)

    # General content tab
    content_panels = CFGOVPage.content_panels + [
        StreamFieldPanel('header'),
        StreamFieldPanel('content'),
    ]

    sidefoot_panels = CFGOVPage.sidefoot_panels + [
        FieldPanel('secondary_nav_exclude_sibling_pages'),
    ]

    # Tab handler interface
    edit_handler = TabbedInterface([
        ObjectList(content_panels, heading='General Content'),
        ObjectList(sidefoot_panels, heading='Sidebar'),
        ObjectList(CFGOVPage.settings_panels, heading='Configuration'),
    ])

    template = 'browse-basic/index.html'

    objects = PageManager()

    def add_page_js(self, js):
        super(BrowsePage, self).add_page_js(js)
        js['template'] += ['secondary-navigation.js']

    def get_context(self, request, *args, **kwargs):
        context = super(BrowsePage, self).get_context(request, *args, **kwargs)
        context.update({'get_secondary_nav_items': get_secondary_nav_items})
        return context
